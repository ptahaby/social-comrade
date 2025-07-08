import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { TokenModule } from './token/token.module';
import { FriendsModule } from './friends/friends.module';
import { PrismaService } from './prisma.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/comrade'),
    RolesModule,
    TokenModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
