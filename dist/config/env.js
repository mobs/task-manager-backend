"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const envalid_1 = require("envalid");
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    NODE_ENV: (0, envalid_1.str)({
        default: 'development',
    }),
    PORT: (0, envalid_1.port)({
        default: 5000,
    }),
    DATABASE_URL: (0, envalid_1.str)(),
    JWT_SECRET: (0, envalid_1.str)(),
    JWT_EXPIRES_IN: (0, envalid_1.str)({
        default: '7d',
    }),
    CLIENT_URL: (0, envalid_1.str)({
        default: 'http://localhost:3000',
    }),
});
