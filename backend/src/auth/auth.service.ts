import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, createdAt, updatedAt, __v, ...safeUser } = user;
      return safeUser;
    }
    return null;
  }

  async createAccessToken(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'my_jwt_access_secret',
      expiresIn: '15m',
    });
  }
  
  async createRefreshToken(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'my_jwt_refresh_secret',
      expiresIn: '7d',
    });
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'my_jwt_refresh_secret',
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new Error('User not found');

      const accessToken = await this.createAccessToken(user);
      const { password, createdAt, updatedAt, __v, ...safeUser } = user;
      return {
        accessToken,
        user: safeUser,
      };
    } catch (err) {
      throw new UnauthorizedException("Invalid refresh token")
    }
  }

  async register(name: string, email: string, password: string) {
    const user = await this.usersService.create(name, email, password);
    const {
      password: _password,
      createdAt,
      updatedAt,
      __v,
      ...safeUser
    } = user;
    return safeUser;
  }
}
