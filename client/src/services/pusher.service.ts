import Pusher from 'pusher-js';

const DEFAULT_API_KEY = 'd0d69dd0bcfe3bc2cf55';

export class PusherService {

	static pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || DEFAULT_API_KEY, {
		cluster: 'eu'
	});

	static connectToChannel = (channel: string) => {
		return this.pusher.subscribe(channel);
	};
}