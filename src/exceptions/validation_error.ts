import { ErrorCode, HTTPExceptions } from "./root";


export class ValidationError extends HTTPExceptions{

    constructor(message:string,error:any){
        super(message,error,ErrorCode.VALIDATION_ERROR,400)
    }
}