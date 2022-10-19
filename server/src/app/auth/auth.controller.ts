import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Res() res: Response) {
    const { token, user } = await this.authService.signUp();
    res.cookie('auth-cookie', { token }, { secure: true, sameSite: 'none' });
    res.send(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  authMe(@Req() req) {
    return req.user;
  }
}
