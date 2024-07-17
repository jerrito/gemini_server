import { NextFunction, Request, Response } from "express";
import { ErrorCode, HTTPExceptions } from "../exceptions/root";

// error middleware
export const errorMiddleware=(error:HTTPExceptions, 
    req:Request,res:Response,
     nextFunction:NextFunction)=>

        res.status(error.statusCode)
        .json({
            message:error.message,
            error:error.errors,
            errorCode:error.errorCode
        });

