"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientError = void 0;
const root_1 = require("./root");
class PrismaClientError extends root_1.HTTPExceptions {
    constructor(message, error, errorCode) {
        super(message, error, errorCode, 423);
    }
}
exports.PrismaClientError = PrismaClientError;
