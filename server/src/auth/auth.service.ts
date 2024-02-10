import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/users.model';
import { CreateUserDTO } from 'src/users/dto/crate-user-dto';
import { UserDto } from 'src/users/dto/user-dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RolesService,
    private readonly tokenService: TokenService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  private generateToken(
    payload: UserDto,
    expiresIn: string = '60s',
    secret?: string,
  ) {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }

  async login(user: UserDocument) {
    const payload = { email: user.email, id: user._id };

    return {
      access_token: this.generateToken(payload),
    };
  }

  async signin(userDto: CreateUserDTO) {
    const user = await this.validateUser(userDto.email, userDto.password);
    if (!user) {
      throw new UnauthorizedException({ message: 'invalid email or password' });
    }

    const access = this.generateToken({ email: user.email, id: user._id });
    const refresh = this.generateToken(
      { email: user.email, id: user._id },
      '120s',
      process.env.JWT_REFRESH_SECRET,
    );

    await this.tokenService.saveToken(user._id, refresh);
    return {
      email: user.email,
      id: user.id,
      accessToken: access,
      refreshToken: refresh,
    };
  }

  async signup(userDTO: CreateUserDTO) {
    const account = await this.userService.getUser({ email: userDTO.email });
    if (account) {
      throw new HttpException(
        'User is exit with same email',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(userDTO.password, salt);
    const role = await this.roleService.getRole({ name: 'user' });
    const user = await this.userService.createUser(
      userDTO.email,
      hashPassword,
      role._id,
    );

    return user;
  }

  async logout(refreshToken: string) {
    this.tokenService.removeToken(refreshToken);
  }

  async refresh(token?: string) {
    if (!token) {
      throw new UnauthorizedException();
    }

    const userData = this.tokenService.validateRefreshToken(token);
    const tokenFromDb = await this.tokenService.findToken(token);

    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.getUserById(userData.id);

    const userDto = new UserDto(user);
    const accessToken = this.generateToken({ email: user.email, id: user._id });
    const refreshToken = this.generateToken(
      { email: user.email, id: user._id },
      '120s',
      process.env.JWT_REFRESH_SECRET,
    );
    await this.tokenService.saveToken(userDto.id, refreshToken);
    return { accessToken, refreshToken, user: userDto };
  }
}
