import React from 'react';
import {Button, PageHeader, List, Typography, Badge} from 'antd';
import endpoints from '../../../constants/endpoints';
import apiClientService from '../../../services/api-client.service';
import {Link} from 'react-router-dom';
import {subscribeChannel} from './subscribeChannel';

const {Item} = List;

const ChannelList = () => {
	const channels = subscribeChannel();
	const {sendRequest: createChannel} = apiClientService('post', endpoints.channels);


	const handelNew = () => {
		createChannel({});
	};

	return (
		<PageHeader
			title="Каналы"
			extra={<Button type="primary" onClick={handelNew}>Добавить</Button>}
		>
			<List
				bordered
				dataSource={channels}
				renderItem={({id, name, unread}) => (
					<Item key={id}>
						<Badge count={unread}>
							<Link to={id}>
								<Typography.Text>{name}</Typography.Text>
							</Link>

						</Badge>
					</Item>
				)}
			/>
		</PageHeader>
	);
};

export default ChannelList;