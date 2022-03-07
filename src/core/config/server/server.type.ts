export type ServerConfiguration = {
  host: string;
  port: string;
  rateLimit: {
    maxRequest: number;
    interval: number;
  };
  daemon: string;
};
