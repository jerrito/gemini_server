import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { tokenKey } from "../secrets";
import { PrismaClient, User } from '@prisma/client';
import { UnauthorizedException } from "../exceptions/unauthorized";
import { BadRequest } from "../exceptions/bad_request";
import { prisma } from "../prisma_client";
import redis,{ createClient } from "redis";
import { client } from "..";
const connectionString = `${process.env.DATABASE_URL}`


 const authMiddleware =async (req:Request,res:Response,next:NextFunction)=>{


    // 1. retrieve token from header 
    const token=req.headers.authorization; 
    
    
    // 2.If present verify token is valid and extract payload
    if(token == undefined){
        next(new UnauthorizedException(
            "Unauthorized",
            ErrorCode.UNAUTHORIZED,
        ),)
    }
    // client
    // .connect()
    // .then(async (client) => {
    //   console.log('connected');
    //   // Write your own code here
    //   const tokenBlackListed=await client.get("token");

    //   console.log(tokenBlackListed);
    
    //  if(tokenBlackListed !=null){
    //     next( new BadRequest("Invalid token",
    //         ErrorCode.UNAUTHORIZED,));
    //  }
    // })
    // .catch((err) => {
    //   next( new BadRequest("Unable to retrieve cache token",
    //     ErrorCode.UNAUTHORIZED,));
    //   console.log('err happened' + err);
    // });
 


   try{
 // 3. get the user fro payload
  

 const payload=jwt.verify(
    token!,
    tokenKey
) as any

console.log(payload);

// 4. Attach user to current request object


  
 const user=await prisma.user.findFirst({
    where:{id:Number(payload.id)}
 });
 
 if(!user){
   return  next(new UnauthorizedException(
        "User not found",
        ErrorCode.NOT_FOUND,
    ),);
    }

   req.user  = user; 
   
   
   next();
   
   }catch(e){
    next(new UnauthorizedException(
        "Unauthorization",
        ErrorCode.UNAUTHORIZED,
    ),);
   }
}

export default authMiddleware;


