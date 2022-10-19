import React from 'react';
import {Button, Form, Input} from 'antd';
import {useMessageForm} from './hook';

interface CreateMessageFormProps{
	channelId: string;
}

const CreateMessageForm: React.FC<CreateMessageFormProps> = ({channelId}) => {
	const {onSubmit, form} = useMessageForm(channelId);

	return (
		<Form
			name="create-message"
			layout="inline"
			form={form}
			onFinish={onSubmit}
		>
			<Form.Item name="message">
				<Input placeholder="сообщение"/>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Отправить
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateMessageForm;