import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDocument } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel('role') private roleModel: Model<RoleDocument>) {}
  async addRole(name: string, description: string) {
    return this.roleModel.create({ name, description });
  }

  async getRole(query: object): Promise<RoleDocument> {
    return this.roleModel.findOne(query);
  }
}
