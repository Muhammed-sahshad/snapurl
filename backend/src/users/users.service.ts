import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(name: string, email: string, password: string): Promise<User> {
    const isEmailExist = await this. userModel.findOne({email})

    if(isEmailExist){
      throw new ConflictException('email id exist')
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword });
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).lean()
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).lean()
  }
}
