import { ErrorCode, HTTPExceptions } from "./root";


export class BadRequest extends HTTPExceptions{
    constructor(message:string,error:ErrorCode){
        super(message,null,ErrorCode.BAD_REQUEST,400)
    }
}