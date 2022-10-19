


import {
	MessageFormValues,
} from './form';
import endpoints from '../../../../constants/endpoints';
import apiClientService from '../../../../services/api-client.service';
import {Form} from 'antd';

export const useMessageForm = (
	channelId: string,
) => {
	const [form] = Form.useForm();
	const { sendRequest: createMessage } = apiClientService(
		'post',
		endpoints.messages
	);

	const onSubmit = async (values: MessageFormValues) => {
		const body = { ...values, channelId };

		await createMessage({body});
		form.resetFields();
	};

	return { onSubmit, form };
};