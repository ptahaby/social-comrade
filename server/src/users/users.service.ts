import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(
    email: string,
    password: string,
    roleId?: Types.ObjectId,
  ): Promise<User> {
    const newUser = await this.userModel.create({ email, password });
    if (roleId) {
      await this.userModel.findByIdAndUpdate(
        newUser._id,
        {
          $push: { roles: roleId },
        },
        { new: true, useFindAndModify: false },
      );
    }
    return newUser;
  }

  async getUser(query: object): Promise<UserDocument> {
    return await this.userModel.findOne(query).populate({
      path: 'roles',
      model: 'role',
    });
  }

  async getUserById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).populate({
      path: 'roles',
      model: 'role',
    });
  }

  async getAllUser(): Promise<UserDocument[]> {
    return this.userModel.find({}).populate({
      path: 'roles',
      model: 'role',
    });
  }
}
