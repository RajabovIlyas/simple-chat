import { Environment } from './models';
import { User } from '../app/user/user.entity';
import { Read } from '../app/read/read.entity';
import { Message } from '../app/message/message.entity';
import { Channel } from '../app/channel/channel.entity';

export const envProduction: Environment = {
  production: true,
  jwtSecret: 'askjdfla;skfdj;l',
  baseUrl: 'https://chat-client-online.netlify.app',
  db: {
    url: process.env.DATABASE_URL,
    type: 'postgres',
    entities: [User, Read, Message, Channel],
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  pusherOptions: {
    appId: '1490666',
    key: '4f4d72c75b457c88e669',
    secret: '31619afe0178fa24877f',
    cluster: 'eu',
    useTLS: true,
  },
};
