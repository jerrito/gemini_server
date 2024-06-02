import { Request, Response } from "express"
import { ZodError } from "zod";
import { ErrorCode, HTTPExceptions } from "./exceptions/root";
import { ValidationError } from "./exceptions/validation_error";
import { InternalException } from "./exceptions/internal_server";
import { BadRequest } from "./exceptions/bad_request";


export const errorHandler=(method:Function)=>{
    return async(req:Request,res:Response,next:Function)=>{
        try{
            await method(req,res,next);
        }catch(error:any){
            let exception:HTTPExceptions;
            if(error instanceof HTTPExceptions){
                exception=error;
                next(exception); 
            }
            else if(error instanceof BadRequest){
                exception=error;
                next(exception); 
            }
            else{
                if(error instanceof ZodError){
                    next(new ValidationError(
                        "Validation error",
                    ErrorCode.ValidationError,),);
                }
                else{
                    exception=new InternalException(
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
