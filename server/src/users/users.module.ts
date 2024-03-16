import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserSchema } from './users.model';
import { UserService } from './users.service';
import { TokenService } from '../token/token.service';
import { TokenSchema } from 'src/token/token.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'token', schema: TokenSchema },
    ]),
  ],
  providers: [UserService, TokenService],
  controllers: [UsersController],
})
export class UsersModule {}
