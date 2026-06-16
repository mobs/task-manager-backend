import { Request, Response } from 'express';

import { asyncHandler } from '@/utils/async-handler';

import { TasksService } from './tasks.service';

export class TasksController {
  private service = new TasksService();

  createTask = asyncHandler(async (req: Request, res: Response) => {
    const task = await this.service.createTask(req.user!.id, req.body);

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  });
  getTasks = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.service.getTasks(
      req.user!.id,

      req.query as {
        page?: number;
        limit?: number;
        status?: string;
        search?: string;
      },
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  });

  getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const task = await this.service.getTaskById(req.params.id, req.user!.id);

    return res.status(200).json({
      success: true,
      data: task,
    });
  });

  updateTask = asyncHandler(async (req: Request, res: Response) => {
    const task = await this.service.updateTask(
      req.params.id,
      req.user!.id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  });

  deleteTask = asyncHandler(async (req: Request, res: Response) => {
    await this.service.deleteTask(req.params.id, req.user!.id);

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  });
}
