import { comparePassword, createJwtToken, hashPassword } from '@bamboo/utils';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginInput, RegisterInput } from './admin.input';
import { Admin, AdminDocument } from './admin.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {
  }

  async login({ email, password }: LoginInput) {
    const found = await this.adminModel.findOne({ email });
    if (!found || !comparePassword({ plainTextPassword: password, hashedPassword: found.password })) {
      throw new HttpException('Login Error', HttpStatus.UNAUTHORIZED)
    }

    return createJwtToken(found);
  }

  register(newAdmin: RegisterInput) {
    return this.adminModel.create({...newAdmin, password: hashPassword(newAdmin.password)});
  }
}
