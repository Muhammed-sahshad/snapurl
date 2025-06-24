import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UrlsService } from './urls.service';

import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body('originalUrl') originalUrl: string) {
    const user = req.user as { userId: string };
    return this.urlsService.create(originalUrl, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const user = req.user as { userId: string };
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    return this.urlsService.findAllByUser(user.userId, pageNumber, limitNumber);
  }

  @Get('/s/:code')
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const url = await this.urlsService.findByShortCode(code);
    if (!url) return res.status(404).json({ message: 'Short URL not found' });
    return res.redirect(url.originalUrl);
  }
}
