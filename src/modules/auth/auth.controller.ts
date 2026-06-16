import {
  Request,
  Response,
} from 'express';

import { asyncHandler } from '@/utils/async-handler';

import { AuthService } from './auth.service';

export class AuthController {
  private service =
    new AuthService();

  signup = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const result =
        await this.service.signup(
          req.body,
        );

      return res.status(201).json({
        success: true,
        message:
          'User created successfully',
        data: result,
      });
    },
  );

  login = asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const result =
        await this.service.login(
          req.body,
        );

      return res.status(200).json({
        success: true,
        message:
          'Login successful',
        data: result,
      });
    },
  );
}