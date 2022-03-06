import { registerAs } from '@nestjs/config';

export const serverConfig = registerAs('server', () => ({
  host: process.env.HOST,
  port: process.env.PORT,
}));
