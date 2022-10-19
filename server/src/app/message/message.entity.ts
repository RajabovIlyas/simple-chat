import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from '../user/user.entity';
import { Channel } from '../channel/channel.entity';
import { Read } from "../read/read.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  userSend: User;

  @Column()
  channelId: string;

  @ManyToOne(() => Channel, (channel) => channel.messages)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;

  @OneToMany(() => Read, (read) => read.message)
  reads: Read[];
}
