import { ErrorCode, HTTPExceptions } from "./root";


export class FirebaseException extends HTTPExceptions{
    constructor(
        message:string,error:any,
    ){
        super(
            message,
            error,
            ErrorCode.BAD_REQUEST,
            420
        )
    }
}