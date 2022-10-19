import { Environment } from './models';

export const envDevelopment: Environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  jwtSecret: '12345',
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'user',
    password: 'root',
    database: 'chat',
    synchronize: true,
    autoLoadEntities: true,
  },
  pusherOptions: {
    appId: '1490664',
    key: 'd0d69dd0bcfe3bc2cf55',
    secret: '7b3c08e45447120c96d2',
    cluster: 'eu',
    useTLS: true,
  },
};
