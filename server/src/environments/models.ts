import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Options } from 'pusher';

export interface Environment {
  production?: boolean;
  baseUrl?: string;
  jwtSecret?: string;
  db?: TypeOrmModuleOptions;
  pusherOptions?: Options;
}
