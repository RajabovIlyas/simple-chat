import React from 'react';
import axios from 'axios';


export const axiosInstance = axios.create(
	{
		baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3333/api',
		withCredentials: true,
	}
);

const apiClientService = (
	method: 'get' | 'post' | 'patch',
	endpoint: string,
	fetchOnInit?: boolean
) => {
	const [isLoading, setLoading] = React.useState(fetchOnInit || false);

	const sendRequest = async (
		{body, params}: Config,
		newEndpoint?: string
	) => {
		try {
			setLoading(true);
			const res = await axiosInstance[method](newEndpoint || endpoint, {...(body || {}), params});
			return res;
		} catch (e) {
			return e;
		} finally {
			setLoading(false);
		}
	};

	return {
		sendRequest,
		isLoading,
	};
};

interface Config {
	body?: any;
	params?: any;
}

export default apiClientService;