

export class HTTPExceptions extends Error{
  message: string;
  errors:ErrorCode;
  errorCode:ErrorCode;
  statusCode:number;

    constructor(message:string,error:any,
        errorCode:ErrorCode,statusCode:number){
        super(message);
        this.message=message;
        this.errors=error;
        this.errorCode=errorCode;
        this.statusCode=statusCode;
    }
}




export enum ErrorCode {
    NOT_FOUND = 404,
    USER_ALREADY_EXIST = 101,
    BAD_REQUEST = 102,
    VALIDATION_ERROR = 400,
    InternalServerError=500,
    UNAUTHORIZED=401,
    ValidationError=409
}