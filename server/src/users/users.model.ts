import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/roles/roles.model';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'role' })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
