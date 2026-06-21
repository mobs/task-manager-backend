"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepository = void 0;
const database_1 = require("../../config/database");
class TasksRepository {
    async createTask(data) {
        return database_1.prisma.task.create({
            data,
        });
    }
    async getTasks(where, skip, take) {
        const [tasks, total] = await Promise.all([
            database_1.prisma.task.findMany({
                where,
                skip,
                take,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            database_1.prisma.task.count({
                where,
            }),
        ]);
        return {
            tasks,
            total,
        };
    }
    async getTaskById(taskId, userId) {
        return database_1.prisma.task.findFirst({
            where: {
                id: taskId,
                userId,
            },
        });
    }
    async updateTask(taskId, data) {
        return database_1.prisma.task.update({
            where: {
                id: taskId,
            },
            data,
        });
    }
    async deleteTask(taskId) {
        return database_1.prisma.task.delete({
            where: {
                id: taskId,
            },
        });
    }
}
exports.TasksRepository = TasksRepository;
