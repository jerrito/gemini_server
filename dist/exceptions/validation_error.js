"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const root_1 = require("./root");
class ValidationError extends root_1.HTTPExceptions {
    constructor(message, error) {
        super(message, error, root_1.ErrorCode.VALIDATION_ERROR, 400);
    }
}
exports.ValidationError = ValidationError;
