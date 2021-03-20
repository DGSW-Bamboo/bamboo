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
    const roles = this.reflector.get<AdminRole[]>('roles', context.getHandler()) ?? [];
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }
    ctx.user = await this.validateToken(ctx.headers.authorization, roles);
    return true;
  }

  async validateToken(auth: string, roles: AdminRole[]) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];


    try {
      const user: Admin = jwt.verify(token, SECRET_KEY);
      if (roles.length > 0 && !roles.includes(user.role)) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
      return user;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}

export function Authorized(roles?: AdminRole[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard));
}
