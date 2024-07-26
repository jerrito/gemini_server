import { ErrorCode, HTTPExceptions } from "./root";

export class PrismaClientError extends HTTPExceptions{

  constructor(message: string, error: any, errorCode: ErrorCode){
    super(message,error,errorCode,423)
  }
}