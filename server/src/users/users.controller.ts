import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body('password') password: string,
    @Body('email') email: string,
  ): Promise<User> {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      const result = await this.userService.createUser(email, hashedPassword);
      return result;
    } catch (e) {}
  }

  @Get('list')
  async getUserList() {
    return await this.userService.getAllUser();
  }
}
