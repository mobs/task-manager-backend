import { Prisma } from '@prisma/client';

import {
  Request,
  Response,
  NextFunction,
} from 'express';

import { AppError } from '@/utils/app-error';

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (
    error instanceof
    Prisma.PrismaClientKnownRequestError
  ) {
    return res.status(400).json({
      success: false,
      message:
        'Database operation failed',
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message:
      'Internal server error',
  });
}