import { UserDocument } from '../users.model';

export class UserDto {
  email: string;
  id: string;

  constructor(user: UserDocument) {
    this.email = user.email;
    this.id = user._id;
  }
}
