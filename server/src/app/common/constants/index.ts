import { environment } from '../../../environments';

const { jwtSecret, pusherOptions } = environment;

export default {
  pictureUrl: 'https://joeschmoe.io/api/v1/',
  jwtSecret,
  pusherOptions,
};
