"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const root_1 = require("./exceptions/root");
const validation_error_1 = require("./exceptions/validation_error");
const internal_server_1 = require("./exceptions/internal_server");
const bad_request_1 = require("./exceptions/bad_request");
const jsonwebtoken_1 = require("jsonwebtoken");
// import { FirebaseAuthError, FirebaseError } ;
// error handler
const errorHandler = (method) => {
    return async (req, res, next) => {
        try {
            // method
            await method(req, res, next);
        }
        catch (error) {
            let exception;
            if (error instanceof root_1.HTTPExceptions) {
                exception = error;
                next(exception);
            }
            else {
                if (error instanceof bad_request_1.BadRequest) {
                    exception = error;
                    next(exception);
                }
                // if (error instanceof firebaseAdmin.app. FirebaseAuthError){
                //     next (new FirebaseException(
                //         "Firebase Error",
                //         error.message,
                //     ));
                // }    
                if (error instanceof zod_1.ZodError) {
                    next(new validation_error_1.ValidationError("Validation error", error.message));
                }
                // if(error instanceof FirebaseAuthError){
                //     next(new ValidationError(
                //         "Validation error",
                //         error.message,),);
                // }
                if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                    next(new validation_error_1.ValidationError("Token Expired error", error.message));
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
