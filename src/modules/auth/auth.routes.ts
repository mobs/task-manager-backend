import { Router } from 'express';

import { validate } from '@/middlewares/validate.middleware';

import {
  signupSchema,
  loginSchema,
} from './auth.schema';

import { AuthController } from './auth.controller';

const router = Router();

const controller =
  new AuthController();

router.post(
  '/signup',
  validate(signupSchema),
  controller.signup,
);

router.post(
  '/login',
  validate(loginSchema),
  controller.login,
);

export default router;