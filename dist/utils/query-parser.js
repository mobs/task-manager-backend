"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumber = parseNumber;
function parseNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isNaN(parsed)
        ? fallback
        : parsed;
}
