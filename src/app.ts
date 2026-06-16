import express from 'express';
import helmet from 'helmet';

import routes from './routes';

import { corsMiddleware } from './config/cors';

import { rateLimiter } from './config/rate-limit';

import { logger } from './config/logger';

import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(helmet());

app.use(corsMiddleware);

app.use(rateLimiter);

app.use(logger);

app.use(express.json());

app.use('/api', routes);

app.use(errorMiddleware);

export default app;