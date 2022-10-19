import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dtos/create-message.dto';
import { User } from '../user/user.entity';
import { PusherService } from '../pusher/pusher.service';
import { ReadService } from '../read/read.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private pusherService: PusherService,
    private readService: ReadService,
  ) {}

  async create(data: CreateMessageDto, user: User) {
    const message = await this.messageRepository.save({
      ...data,
      userSend: { id: user.id },
      read: [user.id],
    });
    const [fullMessage] = await Promise.all([
      this.messageRepository.findOne({
        where: { id: message.id },
        relations: ['userSend'],
      }),
      this.readService.create({ userId: user.id, messageId: message.id }),
    ]);
    Promise.all([
      this.pusherService.trigger(data.channelId, 'new-message', fullMessage),
      this.pusherService.trigger('channels', 'new-message', {
        id: data.channelId,
      }),
    ]);
    return message;
  }

  async readMessage(id: string, user: User) {
    return this.readService.findOrCreate({ messageId: id, userId: user.id });
  }

  async findByChannel(id: string, user: User) {
    const messages = await this.messageRepository.find({
      where: { channelId: id },
      order: { createdAt: 'ASC' },
      relations: ['userSend', 'channel'],
    });
    await Promise.all(
      messages.map((message) =>
        this.readService.findOrCreate({
          messageId: message.id,
          userId: user.id,
        }),
      ),
    );
    return messages;
  }
}
