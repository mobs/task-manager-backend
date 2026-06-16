import { prisma } from '@/config/database';
import { Prisma } from '@prisma/client';

interface CreateTaskRepositoryDto {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
  userId: string;
}

export class TasksRepository {
  async createTask(data: CreateTaskRepositoryDto) {
    return prisma.task.create({
      data,
    });
  }
  async getTasks(where: Prisma.TaskWhereInput, skip: number, take: number) {
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take,

        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.task.count({
        where,
      }),
    ]);

    return {
      tasks,
      total,
    };
  }
  async getTaskById(taskId: string, userId: string) {
    return prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });
  }

  async updateTask(taskId: string, data: Prisma.TaskUpdateInput) {
    return prisma.task.update({
      where: {
        id: taskId,
      },
      data,
    });
  }

  async deleteTask(taskId: string) {
    return prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
