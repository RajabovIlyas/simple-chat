import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { User } from '../user/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() create: CreateMessageDto, @Req() req: Request) {
    return this.messageService.create(create, req.user as User);
  }

  @Get('channel/:id')
  getMessages(@Param('id') id: string, @Req() req: Request) {
    return this.messageService.findByChannel(id, req.user as User);
  }

  @Patch('read/:id')
  readMessage(@Param('id') id: string, @Req() req: Request) {
    return this.messageService.readMessage(id, req.user as User);
  }
}
