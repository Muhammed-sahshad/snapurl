import { Injectable } from '@nestjs/common';
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
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createAccessToken(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
    };
    return this.jwtService.sign(payload);
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

      return this.createAccessToken(user);
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
  }

  async register(name: string, email: string, password: string) {
    return this.usersService.create(name, email, password);
  }
}
