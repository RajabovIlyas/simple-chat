import {User} from './user.model';
import {Channel} from './channel.model';

export interface Message{
	id: string;
	message: string;
	userSend: User;
	channel: Channel;
	createdAt: Date;
	read: string[];
}