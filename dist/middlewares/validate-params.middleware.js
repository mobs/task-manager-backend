"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = validateParams;
const zod_1 = require("zod");
const validation_error_1 = require("../utils/validation-error");
function validateParams(schema) {
    return (req, res, next) => {
        try {
            req.params = schema.parse(req.params);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: (0, validation_error_1.formatZodErrors)(error),
                });
            }
            next(error);
        }
    };
}
