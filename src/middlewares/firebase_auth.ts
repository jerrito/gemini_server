import { NextFunction, Response } from "express";
import { firebaseAdmin } from ".././index";
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { UserFirebase } from ".././types/index";
import { any } from "zod";

 const firebaseAuthMiddleware=async(req:UserFirebase,res:Response,next:NextFunction)=>{

     const token=req.headers.authorization;
     try{

    const decodedIdToken=await firebaseAdmin.auth().verifyIdToken(
        token!
    );
    console.log(decodedIdToken);
    
    if(decodedIdToken.uid == null){
        throw new BadRequest(
            "Invalid token",
            ErrorCode.UNAUTHORIZED
        )
    };
    console.log(decodedIdToken?.uid)
    let user=await firebaseAdmin.auth().getUser(
        decodedIdToken?.uid ?? 
        "");
        if (!user) {
            return next(new UnauthorizedException(
                "User not found",
                ErrorCode.NOT_FOUND,
            ),);
        }
        
        
        req.firebaseUser=user;
    }
        catch(e :any){
    next(
        (new UnauthorizedException(
            e.toString(),
            ErrorCode.NOT_FOUND,
           ))  ); 
    
        }
  next();


}

export default firebaseAuthMiddleware;