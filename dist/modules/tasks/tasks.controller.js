"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const async_handler_1 = require("../../utils/async-handler");
const tasks_service_1 = require("./tasks.service");
class TasksController {
    service = new tasks_service_1.TasksService();
    createTask = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const task = await this.service.createTask(req.user.id, req.body);
        return res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task,
        });
    });
    getTasks = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const result = await this.service.getTasks(req.user.id, req.query);
        return res.status(200).json({
            success: true,
            data: result,
        });
    });
    getTaskById = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const taskId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const task = await this.service.getTaskById(taskId, req.user.id);
        return res.status(200).json({
            success: true,
            data: task,
        });
    });
    updateTask = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const taskId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const task = await this.service.updateTask(taskId, req.user.id, req.body);
        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task,
        });
    });
    deleteTask = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const taskId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        await this.service.deleteTask(taskId, req.user.id);
        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    });
}
exports.TasksController = TasksController;
