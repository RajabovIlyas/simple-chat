import { envDevelopment } from './environment.development';
import { envProduction } from './environment.production';

const CONFIGS = {
  development: envDevelopment,
  production: envProduction,
};

export const environment =
  CONFIGS?.[process.env.NODE_ENV] || CONFIGS.development;
