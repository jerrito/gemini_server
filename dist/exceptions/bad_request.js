"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const root_1 = require("./root");
class BadRequest extends root_1.HTTPExceptions {
    constructor(message, error) {
        super(message, null, root_1.ErrorCode.BAD_REQUEST, 400);
    }
}
exports.BadRequest = BadRequest;
