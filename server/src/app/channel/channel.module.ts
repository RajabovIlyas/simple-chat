import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { PusherModule } from "../pusher/pusher.module";

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), PusherModule],
  providers: [ChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
