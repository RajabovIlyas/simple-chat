import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateChannelDto } from './dtos/create-channel.dto';
import { ChannelService } from './channel.service';
import { Request } from 'express';
import { User } from '../user/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() create: CreateChannelDto) {
    return this.channelService.create(create);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Req() req: Request) {
    return this.channelService.getAll(req.user as User);
  }
}
