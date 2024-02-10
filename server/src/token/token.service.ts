import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenDocument } from './token.model';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel('token') private tokenModel: Model<TokenDocument>,
    private jwt: JwtService,
  ) {}

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await this.tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const token = await this.tokenModel.deleteOne({ refreshToken });
    return token;
  }

  async findToken(refreshToken: string) {
    const token = await this.tokenModel.findOne({ refreshToken });
    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = this.jwt.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = this.jwt.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }
}
