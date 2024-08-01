import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod";
import { ErrorCode, HTTPExceptions } from "./exceptions/root";
import { ValidationError } from "./exceptions/validation_error";
import { InternalException } from "./exceptions/internal_server";
import { BadRequest } from "./exceptions/bad_request";
import { tokenKey } from "./secrets";
import { Jwt, TokenExpiredError } from "jsonwebtoken";          
import { FirebaseException } from "exceptions/firebase";
import firebaseAdmin from "firebase-admin";
// import { FirebaseAuthError, FirebaseError } ;

// error handler
export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            // method
            await method(req, res, next);
        
        } catch (error: any) {
            let exception: HTTPExceptions;
            if (error instanceof HTTPExceptions) {
                exception = error;
                next(exception);
            }
            else {
                if (error instanceof BadRequest) {
                    exception = error;
                    next(exception);
                }
            // if (error instanceof firebaseAdmin.app. FirebaseAuthError){
            //     next (new FirebaseException(
            //         "Firebase Error",
            //         error.message,
            //     ));
            // }    
                if (error instanceof ZodError) {
                    next(new ValidationError(
                        "Validation error",
                        error.message,),);
                }
                if (error instanceof TokenExpiredError) {
                    next(
                        new ValidationError(
                            "Token Expired error",
                            error.message,),
                    );
                }
                else {
                    exception = new InternalException(
                        "Something went wrong!",
                        error.toString(),
                        ErrorCode.InternalServerError
                    );
                    next(exception);
                }
            }
        }

    }

}
