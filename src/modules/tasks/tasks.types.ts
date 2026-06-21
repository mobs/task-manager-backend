import { $Enums } from '@prisma/client';

export interface CreateTaskDto {
  title: string;
  description: string;
  status: $Enums.TaskStatus;
  priority: $Enums.TaskPriority;
  dueDate: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?:$Enums.TaskStatus;
  priority?: $Enums.TaskPriority;
  dueDate?: string;
}

export interface GetTasksQuery {
  page?: number;
  limit?: number;
  status?: $Enums.TaskStatus;
  search?: string;
}