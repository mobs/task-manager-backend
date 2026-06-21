"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = notFoundMiddleware;
function notFoundMiddleware(_req, res) {
    return res.status(404).json({
        success: false,
        message: 'Route not found',
    });
}
