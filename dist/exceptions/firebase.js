"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseException = void 0;
const root_1 = require("./root");
class FirebaseException extends root_1.HTTPExceptions {
    constructor(message, error) {
        super(message, error, root_1.ErrorCode.BAD_REQUEST, 420);
    }
}
exports.FirebaseException = FirebaseException;
