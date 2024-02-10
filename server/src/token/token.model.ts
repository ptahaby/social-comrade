import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from 'src/users/users.model';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ type: Types.ObjectId, ref: 'user' })
  user: User;

  @Prop()
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
