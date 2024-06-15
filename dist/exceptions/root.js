"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HTTPExceptions = void 0;
class HTTPExceptions extends Error {
    constructor(message, error, errorCode, statusCode) {
        super(message);
        this.message = message;
        this.errors = error;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
}
exports.HTTPExceptions = HTTPExceptions;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXIST"] = 101] = "USER_ALREADY_EXIST";
    ErrorCode[ErrorCode["BAD_REQUEST"] = 102] = "BAD_REQUEST";
    ErrorCode[ErrorCode["VALIDATION_ERROR"] = 400] = "VALIDATION_ERROR";
    ErrorCode[ErrorCode["InternalServerError"] = 500] = "InternalServerError";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["ValidationError"] = 409] = "ValidationError";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
