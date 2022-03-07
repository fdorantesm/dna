import { registerAs } from '@nestjs/config';
import { AuthMechanism } from 'mongodb';

import { DatabaseConfiguration } from './database.type';

export const databaseConfig = registerAs(
  'database',
  (): DatabaseConfiguration => ({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    auth: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      mechanism: <AuthMechanism>(process.env.DB_AUTH_MECHANISM || 'PLAIN'),
    },
  }),
);
