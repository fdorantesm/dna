import { registerAs } from '@nestjs/config';

export const serverConfig = registerAs('server', () => ({
  host: process.env.HOST,
  port: process.env.PORT,
  rateLimit: {
    maxRequest: process.env.RATE_MAX_REQUEST || 10,
    interval: process.env.RATE_INTERVAL || 30000,
  },
  daemon: process.env.DAEMON || '* * * * *',
}));
