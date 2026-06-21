"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const hash_1 = require("../../utils/hash");
const jwt_1 = require("../../utils/jwt");
const auth_repository_1 = require("./auth.repository");
const app_error_1 = require("../../utils/app-error");
class AuthService {
    repository = new auth_repository_1.AuthRepository();
    async signup(payload) {
        const existingUser = await this.repository.findByEmail(payload.email);
        if (existingUser) {
            throw new app_error_1.AppError('Email already exists', 409);
        }
        const hashedPassword = await (0, hash_1.hashPassword)(payload.password);
        const user = await this.repository.createUser(payload.email, hashedPassword);
        const token = (0, jwt_1.signToken)({
            userId: user.id,
        });
        return {
            token,
        };
    }
    async login(payload) {
        const user = await this.repository.findByEmail(payload.email);
        if (!user) {
            throw new app_error_1.AppError('Invalid credentials', 401);
        }
        const passwordMatches = await (0, hash_1.comparePassword)(payload.password, user.password);
        if (!passwordMatches) {
            throw new app_error_1.AppError('Invalid credentials', 401);
        }
        const token = (0, jwt_1.signToken)({
            userId: user.id,
        });
        return {
            token,
        };
    }
}
exports.AuthService = AuthService;
