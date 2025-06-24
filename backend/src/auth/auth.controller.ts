import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.authService.register(
      body.name,
      body.email,
      body.password,
    );
    const accessToken = await this.authService.createAccessToken(user);
    const refreshToken = await this.authService.createRefreshToken(user);

    res
      .status(201)
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        path: '/api/auth/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ accessToken, user });
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const accessToken = await this.authService.createAccessToken(user);
    const refreshToken = await this.authService.createRefreshToken(user);

    res
      .status(200)
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        path: '/api/auth/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ accessToken, user });
  }

  @Post('refresh')
  async tokenRefresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    console.log(refreshToken)
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }
    const user =
      await this.authService.refreshAccessToken(refreshToken);

     res.status(200).json(user);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
  res
    .clearCookie('refresh_token', { path: '/api/auth/refresh' })
    .status(200)
    .json({ message: 'Logged out successfully' });
}
}
