import { ErrorCode, HTTPExceptions } from "./root";


export class NotFoundException extends HTTPExceptions{

    constructor(message:string,errorCode:number,){
        super(message,null,errorCode,404);
    }

}