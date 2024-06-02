import { ErrorCode, HTTPExceptions } from "./root";


export class UnauthorizedException extends HTTPExceptions{
    constructor(message:string,error:ErrorCode){
        super(message,null,ErrorCode.UNAUTHORIZED,401)
    }
}