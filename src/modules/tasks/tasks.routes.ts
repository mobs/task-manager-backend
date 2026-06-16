import { Router } from 'express';

import { authMiddleware } from '@/middlewares/auth.middleware';

import { validate } from '@/middlewares/validate.middleware';

import { createTaskSchema } from './tasks.schema';

import { TasksController } from './tasks.controller';

import { validateQuery } from '@/middlewares/validate-query.middleware';

import { taskQuerySchema } from './tasks.schema';

import { validateParams } from '@/middlewares/validate-params.middleware';

import { taskIdParamsSchema, updateTaskSchema } from './tasks.schema';

const router = Router();

const controller = new TasksController();

router.post(
  '/',
  authMiddleware,
  validate(createTaskSchema),
  controller.createTask,
);

router.get(
  '/',
  authMiddleware,
  validateQuery(taskQuerySchema),
  controller.getTasks,
);

router.get(
  '/:id',
  authMiddleware,
  validateParams(taskIdParamsSchema),
  controller.getTaskById,
);

router.patch(
  '/:id',
  authMiddleware,
  validateParams(taskIdParamsSchema),
  validate(updateTaskSchema),
  controller.updateTask,
);

router.delete(
  '/:id',
  authMiddleware,
  validateParams(taskIdParamsSchema),
  controller.deleteTask,
);

export default router;
