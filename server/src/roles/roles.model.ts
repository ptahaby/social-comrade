import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from 'src/users/users.model';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  users: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
