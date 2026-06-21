"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = validateQuery;
const zod_1 = require("zod");
const validation_error_1 = require("../utils/validation-error");
function validateQuery(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.query);
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
