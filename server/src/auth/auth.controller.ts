import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from 'src/users/users.model';
import { CreateUserDTO } from 'src/users/dto/crate-user-dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: { user: UserDocument }) {
    return this.authService.login(req.user);
  }

  @Post('/signin')
  async signin(
    @Body() createUserDto: CreateUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.signin(createUserDto);
    response.cookie('refreshToken', data.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      domain: process.env.FRONTEND_DOMAIN,
    });

    return data;
  }

  @Post('signup')
  signup(@Body() createUserDTO: CreateUserDTO) {
    return this.authService.signup(createUserDTO);
  }

  @Get('logout')
  logout(@Req() req: Request) {
    const refreshToken = req.cookies['refreshToken'];
    return this.authService.logout(refreshToken);
  }

  @Get('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies;
    const userData = await this.authService.refresh(refreshToken);
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 120 * 60 * 1000,
      httpOnly: true,
      domain: 'localhost',
    });
    return userData;
  }
}
