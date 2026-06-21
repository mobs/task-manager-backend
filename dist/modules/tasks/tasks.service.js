"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const tasks_repository_1 = require("./tasks.repository");
const app_error_1 = require("../../utils/app-error");
class TasksService {
    repository = new tasks_repository_1.TasksRepository();
    async createTask(userId, payload) {
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
    async getTasks(userId, query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;
        const where = {
            userId,
        };
        if (query.status) {
            where.status = query.status;
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
    async getTaskById(taskId, userId) {
        const task = await this.repository.getTaskById(taskId, userId);
        if (!task) {
            throw new app_error_1.AppError('Task not found', 404);
        }
        return task;
    }
    async updateTask(taskId, userId, payload) {
        const existingTask = await this.repository.getTaskById(taskId, userId);
        if (!existingTask) {
            throw new app_error_1.AppError('Task not found', 404);
        }
        const updatedTask = await this.repository.updateTask(taskId, {
            ...payload,
            dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined,
        });
        return updatedTask;
    }
    async deleteTask(taskId, userId) {
        const existingTask = await this.repository.getTaskById(taskId, userId);
        if (!existingTask) {
            throw new app_error_1.AppError('Task not found', 404);
        }
        await this.repository.deleteTask(taskId);
        return;
    }
}
exports.TasksService = TasksService;
