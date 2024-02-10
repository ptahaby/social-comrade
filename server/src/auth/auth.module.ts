import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './auth.strategy';
import { UserSchema } from 'src/users/users.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
import { RoleSchema } from 'src/roles/roles.model';
import { TokenService } from 'src/token/token.service';
import { TokenSchema } from 'src/token/token.model';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_ACCESS_SECRET}`,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'role', schema: RoleSchema },
      { name: 'token', schema: TokenSchema },
    ]),
  ],
  providers: [
    AuthService,
    UserService,
    RolesService,
    LocalStrategy,
    TokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
