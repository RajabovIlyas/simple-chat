import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dtos/create-channel.dto';
import * as randomName from 'node-random-name';
import { PusherService } from '../pusher/pusher.service';
import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    private pusherService: PusherService,
  ) {}

  async create({ name }: CreateChannelDto) {
    const channel = await this.channelRepository.save({
      name: name || randomName(),
    });
    this.pusherService.trigger('channels', 'create', channel);
    return channel;
  }

  getAll(user: User) {
    return this.channelRepository
      .createQueryBuilder('c')
      .select('c.id', 'id')
      .addSelect('c.name', 'name')
      .addSelect('COUNT(m) - COUNT(r)', 'unread')
      .leftJoin('c.messages', 'm')
      .leftJoin('m.reads', 'r', 'r.userId =:userId', {
        userId: user.id,
      })
      .groupBy('c.id')
      .getRawMany();
  }
}
