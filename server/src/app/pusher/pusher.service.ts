import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';
import constants from '../common/constants';

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher(constants.pusherOptions);
  }

  trigger<T>(channel: string, event: string, data: T) {
    return this.pusher.trigger(channel, event, data);
  }
}
