"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const async_handler_1 = require("../../utils/async-handler");
const auth_service_1 = require("./auth.service");
class AuthController {
    service = new auth_service_1.AuthService();
    signup = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const result = await this.service.signup(req.body);
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: result,
        });
    });
    login = (0, async_handler_1.asyncHandler)(async (req, res) => {
        const result = await this.service.login(req.body);
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result,
        });
    });
}
exports.AuthController = AuthController;
