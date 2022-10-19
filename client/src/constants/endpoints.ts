export const channels = '/channels';
export const messagesByChannel = (channelId: string) => `/messages/channel/${channelId}`;
export const messageReadById = (messageId: string) => `/messages/read/${messageId}`;
export const authMe = '/auth/me';
export const signUp = '/auth/sign-up';
export const messages = '/messages';

export default {
	channels,
	messagesByChannel,
	messageReadById,
	authMe,
	signUp,
	messages
};