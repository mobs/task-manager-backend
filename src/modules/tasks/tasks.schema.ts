import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const taskIdParamsSchema = z.object({
  id: z.string().min(1, 'Task id is required'),
});

export const createTaskSchema =
  z.object({
    title: z
      .string()
      .min(1, 'Title is required'),

    description: z
      .string()
      .min(
        1,
        'Description is required',
      ),

    status: z.enum($Enums.TaskStatus),

    priority: z.enum($Enums.TaskPriority),

    dueDate: z
      .string()
      .datetime(
        'Due date must be a valid ISO date',
      ),
  });

export const updateTaskSchema =
  createTaskSchema.partial();

export const taskQuerySchema =
  z.object({
    page: z.coerce
      .number()
      .min(1)
      .optional(),

    limit: z.coerce
      .number()
      .min(1)
      .max(100)
      .optional(),

    status: z
      .enum([
        'pending',
        'in_progress',
        'completed',
      ])
      .optional(),

    search: z
      .string()
      .optional(),
  });