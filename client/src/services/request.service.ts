import {useEffect, useState} from 'react';
import endpoints from '../constants/endpoints';
import {axiosInstance} from './api-client.service';



axiosInstance.interceptors.response.use((response) => {
	return response;
}, async (error) => {
	if (error.response.status === 401) {
		await axiosInstance.post(endpoints.signUp);

		const {method, url, data} = error.config;
		return axiosInstance[(method.toLowerCase() as 'get' | 'post')](url, data);
	}
	return Promise.reject(error);
});

export const requestService = <T>(endpoint: string, method: 'get' | 'post', data = {}) => {
	const [response, setResponse] = useState<null | T>(null);
	const [error, setError] = useState<unknown>();
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = async () => {
		try {
			const res = await axiosInstance?.[method](endpoint, data);
			setResponse(res.data);
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return {response, error, loading};
};


