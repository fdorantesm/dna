import { ConfigLoader } from './types/config.type';

export const configLoader = (): ConfigLoader => ({
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
});
