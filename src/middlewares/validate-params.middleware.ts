import {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  ZodTypeAny,
  ZodError,
} from 'zod';

import { formatZodErrors } from '@/utils/validation-error';

export function validateParams(
  schema: ZodTypeAny,
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      req.params = schema.parse(req.params) as typeof req.params;

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