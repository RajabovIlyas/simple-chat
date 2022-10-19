import {useMemo, useState} from 'react';
import {requestService} from '../../../services/request.service';
import endpoints from '../../../constants/endpoints';
import {PusherService} from '../../../services/pusher.service';
import {Message} from '../../../models/message.model';
import apiClientService from '../../../services/api-client.service';

export const subscribeChat = (channelId: string) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const { sendRequest: readMessage } = apiClientService(
		'patch',
		endpoints.messages
	);
	const {response: messagesResponse} = requestService<Message[]>(endpoints.messagesByChannel(channelId), 'get');

	useMemo(() => {
		setMessages(messagesResponse || []);
	}, [messagesResponse]);

	const subscribe = PusherService.connectToChannel(channelId);
	subscribe.bind('new-message', (message: Message) => {
		setMessages([...messages, message]);
		readMessage({}, endpoints.messageReadById(message.id));
	});
	return messages;
};