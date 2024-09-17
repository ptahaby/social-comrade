import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/users.model';

export type FriendsDocument = Friends & Document;

enum Status {
  'PENDING',
  'ACTIVE',
  'REJECTED',
}

@Schema()
export class Friends {
  @Prop({ type: Types.ObjectId, ref: 'user' })
  requester: User;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  recipient: User;

  @Prop()
  status: Status;
}
