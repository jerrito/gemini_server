import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { tokenKey } from "../secrets";
import { PrismaClient, User } from '@prisma/client';
import { prismaClient } from "..";
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg';
import { log } from "console";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { BadRequest } from "../exceptions/bad_request";
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })
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
     const tokenBlackListed=await prisma.blackListedTokens.findFirst({
    where:{
        token:token
    }
 })

 if(tokenBlackListed){
    next( new BadRequest("Invalid token",
        ErrorCode.UNAUTHORIZED,));
 }


   try{
 // 3. get the user fro payload
  

 const payload=jwt.verify(
    token!,
    tokenKey
) as any

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