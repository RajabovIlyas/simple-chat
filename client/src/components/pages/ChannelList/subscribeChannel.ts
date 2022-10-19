import {PusherService} from '../../../services/pusher.service';
import {Channel} from '../../../models/channel.model';
import {useMemo, useState} from 'react';
import {requestService} from '../../../services/request.service';
import endpoints from '../../../constants/endpoints';

export const subscribeChannel = () => {
	const [channels, setChannels] = useState<Channel[]>([]);
	const {response: channelsResponse} = requestService<Channel[]>(endpoints.channels, 'get');

	useMemo(() => {
		setChannels(channelsResponse || []);
	}, [channelsResponse]);

	const subscribe = PusherService.connectToChannel('channels');
	subscribe.bind('create', (channel: Channel) => {
		setChannels([...channels, channel]);
	});
	subscribe.bind('new-message', ({id}: Pick<Channel, 'id'>) => {
		setChannels(channels.map(({unread, ...channel}) => ({...channel, unread: id === channel.id? +unread +1: +unread})));
	});
	return channels;
};