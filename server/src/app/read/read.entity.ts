import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from '../message/message.entity';
import { User } from '../user/user.entity';

@Entity()
export class Read {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  messageId: string;

  @ManyToOne(() => Message, (message) => message.reads)
  @JoinColumn({ name: 'messageId' })
  message: Message;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
