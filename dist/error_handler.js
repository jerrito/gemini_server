"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const root_1 = require("./exceptions/root");
const validation_error_1 = require("./exceptions/validation_error");
const internal_server_1 = require("./exceptions/internal_server");
const bad_request_1 = require("./exceptions/bad_request");
const errorHandler = (method) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield method(req, res, next);
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
    });
};
exports.errorHandler = errorHandler;
