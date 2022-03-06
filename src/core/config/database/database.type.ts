import { AuthMechanism } from 'mongodb';

export type DatabaseConfiguration = {
  host: string;
  port?: number;
  database?: string;
  auth: {
    username?: string;
    password?: string;
    mechanism: AuthMechanism;
  };
};
