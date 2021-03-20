import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus, UseGuards, SetMetadata
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { applyDecorators } from '@nestjs/common';
import { SECRET_KEY } from '../constants';
import { Admin, AdminRole } from '../admin/admin.model';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<AdminRole>('role', context.getHandler());
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }
    ctx.user = await this.validateToken(ctx.headers.authorization, role);
    return true;
  }

  async validateToken(auth: string, role: AdminRole) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];


    try {
      const user: Admin = jwt.verify(token, SECRET_KEY);
      if (role && role !== user.role) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
      return user;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}

export function Authorized(role?: AdminRole) {
  return applyDecorators(SetMetadata('role', role), UseGuards(AuthGuard));
}