import { ErrorCode, HTTPExceptions } from "./root";


export class BadRequest extends HTTPExceptions{
    constructor(message:string,error:any,){
        super(message,error,ErrorCode.BAD_REQUEST,400)
    }
}