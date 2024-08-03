import { NextFunction, Response } from "express";
import { firebaseAdmin } from ".././index";
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { UserFirebase } from ".././types/index";

 const firebaseAuthMiddleware=async(req:UserFirebase,res:Response,next:NextFunction)=>{

const token=req.headers.authorization;
    const decodedIdToken=await firebaseAdmin.auth().verifyIdToken(
        token!
    );

    if(decodedIdToken.uid == null){
        throw new BadRequest(
            "Invalid token",
            ErrorCode.UNAUTHORIZED
        )
    };

   let user=await firebaseAdmin.auth().getUserByPhoneNumber(
     decodedIdToken?.phone_number ?? 
    "");
    if (!user) {
        return next(new UnauthorizedException(
            "User not found",
            ErrorCode.NOT_FOUND,
        ),);
    }


  req.firebaseUser=user;
  next();


}

export default firebaseAuthMiddleware;