"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskQuerySchema = exports.updateTaskSchema = exports.createTaskSchema = exports.taskIdParamsSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.taskIdParamsSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'Task id is required'),
});
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(1, 'Title is required'),
    description: zod_1.z
        .string()
        .min(1, 'Description is required'),
    status: zod_1.z.enum(client_1.$Enums.TaskStatus),
    priority: zod_1.z.enum(client_1.$Enums.TaskPriority),
    dueDate: zod_1.z
        .string()
        .datetime('Due date must be a valid ISO date'),
});
exports.updateTaskSchema = exports.createTaskSchema.partial();
exports.taskQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce
        .number()
        .min(1)
        .optional(),
    limit: zod_1.z.coerce
        .number()
        .min(1)
        .max(100)
        .optional(),
    status: zod_1.z
        .enum([
        'pending',
        'in_progress',
        'completed',
    ])
        .optional(),
    search: zod_1.z
        .string()
        .optional(),
});
