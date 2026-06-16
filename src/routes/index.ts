import { Router } from 'express';

import authRoutes from '@/modules/auth/auth.routes';

import tasksRoutes from '@/modules/tasks/tasks.routes';

import healthRoutes from './health.routes';

const router = Router();

router.use(
  '/auth',
  authRoutes,
);

router.use(
  '/tasks',
  tasksRoutes,
);

router.use(
  '/health',
  healthRoutes,
);

export default router;