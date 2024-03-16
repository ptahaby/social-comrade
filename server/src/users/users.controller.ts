import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { TokenService } from '../token/token.service';
import { User, UserDocument } from './users.model';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  async getUser(@Req() request: Request): Promise<User> {
    const { refreshToken } = request.cookies;
    const token = await this.tokenService.findToken(refreshToken);
    if (!token) {
      throw new UnauthorizedException({ message: 'Token invalid' });
    }

    const user = await this.userService.getUserById(
      (token.user as UserDocument).id,
    );

    if (!user) {
      throw new UnauthorizedException({ message: 'something wrong' });
    }

    return user;
  }

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
