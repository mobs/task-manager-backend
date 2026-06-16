import 'dotenv/config';

import {
  cleanEnv,
  str,
  port,
} from 'envalid';

export const env = cleanEnv(
  process.env,
  {
    NODE_ENV: str({
      default: 'development',
    }),

    PORT: port({
      default: 5000,
    }),

    DATABASE_URL: str(),

    JWT_SECRET: str(),

    JWT_EXPIRES_IN: str({
      default: '7d',
    }),

    CLIENT_URL: str({
      default:
        'http://localhost:3000',
    }),
  },
);