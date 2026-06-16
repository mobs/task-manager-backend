import { CreateTaskDto } from './tasks.types';
import { TasksRepository } from './tasks.repository';
import { Prisma } from '@prisma/client';
import { AppError } from '@/utils/app-error';

export class TasksService {
  private repository = new TasksRepository();

  async createTask(userId: string, payload: CreateTaskDto) {
    const task = await this.repository.createTask({
      title: payload.title,
      description: payload.description,
      status: payload.status,
      priority: payload.priority,
      dueDate: new Date(payload.dueDate),
      userId,
    });

    return task;
  }
  async getTasks(
    userId: string,
    query: {
      page?: number;
      limit?: number;
      status?: string;
      search?: string;
    },
  ) {
    const page = query.page ?? 1;

    const limit = query.limit ?? 10;

    const skip = (page - 1) * limit;

    const where: Prisma.TaskWhereInput = {
      userId,
    };

    if (query.status) {
      where.status = query.status as never;
    }

    if (query.search) {
      where.title = {
        contains: query.search,

        mode: 'insensitive',
      };
    }

    const result = await this.repository.getTasks(where, skip, limit);

    return {
      tasks: result.tasks,

      pagination: {
        page,

        limit,

        total: result.total,

        totalPages: Math.ceil(result.total / limit),
      },
    };
  }
  async getTaskById(taskId: string, userId: string) {
    const task = await this.repository.getTaskById(taskId, userId);

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return task;
  }
  async updateTask(taskId: string, userId: string, payload: UpdateTaskDto) {
    const existingTask = await this.repository.getTaskById(taskId, userId);

    if (!existingTask) {
      throw new AppError('Task not found', 404);
    }

    const updatedTask = await this.repository.updateTask(taskId, {
      ...payload,

      dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined,
    });

    return updatedTask;
  }

  async deleteTask(taskId: string, userId: string) {
    const existingTask = await this.repository.getTaskById(taskId, userId);

    if (!existingTask) {
      throw new AppError('Task not found', 404);
    }

    await this.repository.deleteTask(taskId);

    return;
  }
}
