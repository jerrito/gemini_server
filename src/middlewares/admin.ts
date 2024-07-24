import { ErrorCode } from "exceptions/root";
import { UnauthorizedException } from "exceptions/unauthorized";
import { Request, NextFunction, Response } from "express";
import { Jwt } from "jsonwebtoken";

enum Role {
    User,
    Admin
}
export const adminMiddleware = (req: Request,res:Response, next: NextFunction) => {

    if (req!.user!.role != Role.Admin.toString()) {
        throw new UnauthorizedException(
            "Unauthorized",
            ErrorCode.UNAUTHORIZED,
        )
    }

    next()

}