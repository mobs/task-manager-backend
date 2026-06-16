import {
  Request,
  Response,
  NextFunction,
} from 'express';

import jwt from 'jsonwebtoken';

import { env } from '@/config/env';

import { AppError } from '@/utils/app-error';

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return next(
      new AppError(
        'Unauthorized',
        401,
      ),
    );
  }

  const token =
    authHeader.split(' ')[1];

  if (!token) {
    return next(
      new AppError(
        'Unauthorized',
        401,
      ),
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      env.JWT_SECRET,
    ) as {
      userId: string;
    };

    req.user = {
      id: decoded.userId,
    };

    next();
  } catch {
    next(
      new AppError(
        'Unauthorized',
        401,
      ),
    );
  }
}