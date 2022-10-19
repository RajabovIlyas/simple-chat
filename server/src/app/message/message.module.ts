import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { PusherModule } from '../pusher/pusher.module';
import { ReadModule } from '../read/read.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), PusherModule, ReadModule],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
