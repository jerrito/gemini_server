"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const root_1 = require("./exceptions/root");
const validation_error_1 = require("./exceptions/validation_error");
const internal_server_1 = require("./exceptions/internal_server");
const bad_request_1 = require("./exceptions/bad_request");
const errorHandler = (method) => {
    return async (req, res, next) => {
        try {
            await method(req, res, next);
        }
        catch (error) {
            let exception;
            if (error instanceof root_1.HTTPExceptions) {
                exception = error;
                next(exception);
            }
            else if (error instanceof bad_request_1.BadRequest) {
                exception = error;
                next(exception);
            }
            else {
                if (error instanceof zod_1.ZodError) {
                    next(new validation_error_1.ValidationError("Validation error", root_1.ErrorCode.ValidationError));
                }
                else {
                    exception = new internal_server_1.InternalException("Something went wrong!", error.toString(), root_1.ErrorCode.InternalServerError);
                    next(exception);
                }
            }
        }
    };
};
exports.errorHandler = errorHandler;
