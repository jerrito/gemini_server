"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const root_1 = require("./root");
class UnauthorizedException extends root_1.HTTPExceptions {
    constructor(message, error) {
        super(message, null, root_1.ErrorCode.UNAUTHORIZED, 401);
    }
}
exports.UnauthorizedException = UnauthorizedException;
