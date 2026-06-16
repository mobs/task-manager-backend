import {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  ZodAny,
  ZodError,
} from 'zod';

import { formatZodErrors } from '@/utils/validation-error';

export function validateParams(
  schema: ZodAny,
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      req.params = schema.parse(
        req.params,
      );

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: formatZodErrors(
            error,
          ),
        });
      }

      next(error);
    }
  };
}