import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './admin.model';
import { LoginInput } from './admin.input';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {
  }

  async login({ email, password }: LoginInput) {
    const found = await this.adminModel.findOne({ email });
    if (!found) {
      throw new HttpException('Login Error', HttpStatus.UNAUTHORIZED)
    }
    if (found.password !== password) {
      throw new HttpException('Login Error', HttpStatus.UNAUTHORIZED)
    }

    return found;
  }

  createToken({ email, name, _id, role }: Admin) {
    return jwt.sign({ email, name, _id, role }, SECRET_KEY);
  }
}
