"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const database_1 = require("../../config/database");
class AuthRepository {
    async findByEmail(email) {
        return database_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
    async createUser(email, password) {
        return database_1.prisma.user.create({
            data: {
                email,
                password,
            },
        });
    }
}
exports.AuthRepository = AuthRepository;
