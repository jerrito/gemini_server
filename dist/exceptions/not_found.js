"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const root_1 = require("./root");
class NotFoundException extends root_1.HTTPExceptions {
    constructor(message, errorCode) {
        super(message, null, errorCode, 404);
    }
}
exports.NotFoundException = NotFoundException;
