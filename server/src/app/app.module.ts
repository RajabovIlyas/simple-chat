import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { MessageModule } from './message/message.module';
import { PusherModule } from './pusher/pusher.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments';
import { ReadModule } from './read/read.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(environment.db),
    UserModule,
    ReadModule,
    ChannelModule,
    MessageModule,
    PusherModule,
    AuthModule,
  ],
})
export class AppModule {}
