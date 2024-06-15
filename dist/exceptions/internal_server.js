"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalException = void 0;
const root_1 = require("./root");
class InternalException extends root_1.HTTPExceptions {
    constructor(message, error, errorCode) {
        super(message, error, errorCode, 500);
    }
}
exports.InternalException = InternalException;
