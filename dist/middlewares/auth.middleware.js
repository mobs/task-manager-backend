"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const app_error_1 = require("../utils/app-error");
function authMiddleware(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new app_error_1.AppError('Unauthorized', 401));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new app_error_1.AppError('Unauthorized', 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        req.user = {
            id: decoded.userId,
        };
        next();
    }
    catch {
        next(new app_error_1.AppError('Unauthorized', 401));
    }
}
