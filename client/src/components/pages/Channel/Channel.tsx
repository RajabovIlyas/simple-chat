import React from 'react';
import {useNavigate} from 'react-router-dom';
import {List, Avatar, PageHeader} from 'antd';
import {subscribeChat} from './subscribeChat';
import {useParams} from 'react-router-dom';
import CreateMessageForm from './CreateMessageForm';


const Channel = () => {
	const navigate = useNavigate();
	const {channelId = ''} = useParams<{ channelId: string }>();

	const messages = subscribeChat(channelId);

	const onBack = () => {
		navigate('/');
	};

	return (
		<PageHeader
			onBack={onBack}
			title="Чат"
		>
			<List
				itemLayout="horizontal"
				dataSource={messages}
				renderItem={(message) => (
					<List.Item key={message.id}>
						<List.Item.Meta
							avatar={<Avatar src={message.userSend.picture}/>}
							title={message.userSend.name}
							description={message.message}
						/>
					</List.Item>
				)}
			/>
			<CreateMessageForm channelId={channelId}/>
		</PageHeader>
	);
};

export default Channel;