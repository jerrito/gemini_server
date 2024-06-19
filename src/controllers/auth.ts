import express, {Request,Response, NextFunction } from "express";

import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from '../exceptions/root';
import { userValidation } from "../validation/user";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { refreshTokenKey, tokenKey } from "../secrets";
import { NotFoundException } from "../exceptions/not_found";
import { prisma } from "../prisma_client";

export const signup=async(req:Request,res:Response,next:NextFunction)=>{
   
    userValidation.parse(req.body);

    const {userName,email,password,profile}=req.body;
    
  let user=await prisma.user.findFirst({
    where:{
        email:email,
        userName:userName
    }
  })
  if(user){
  throw  new BadRequest(
        "User already exist",
        ErrorCode.BAD_REQUEST
    )
  }

  

     user= await prisma.user.create({
        data:{
            userName,
            email:email,
            password:hashSync(password,10),
             
        }
    });

    const refreshToken=jwt.sign({
      id:user.id,
    },
      refreshTokenKey, 
      { expiresIn: '2 days' }
    );

    res.status(200).json({"user":user,"refreshToken":refreshToken});

}


export const signin=async(req:Request,res:Response,next:NextFunction)=>{
  
  const {email , userName,password,tokenData}=req.body;

  const user=await prisma.user.findFirst({
    where:{
      email:email
    }
  });
  if(!user){
   throw new NotFoundException("User not found",ErrorCode.NOT_FOUND);
  }
  const checkPassword=compareSync (
    password,
    user?.password,
    );
    if(!checkPassword){
    throw  new BadRequest("Password incorrect",
      ErrorCode.BAD_REQUEST)
    }
    const token=jwt.sign({
      id:user.id,
    },
      tokenKey, 
      { expiresIn: '15m' }
    );

    const refreshToken=jwt.sign({
      id:user.id,
    },
      refreshTokenKey, 
      { expiresIn: '2 days' }
    );
 
  const s=  await prisma.tokens.createMany({
     
      data:[{
        token:token,
        userId:user.id
      },
      {  token:refreshToken,
        userId:user.id
     }
     ],
      
    });

   
   

    res.status(200).json({
     "user":user,"token":token ,"refreshToken":refreshToken 
    })

}

export const me=async(req:Request,res:Response)=>{
  return res.status(200).json(req?.user);
}


export const logOut=async(req:Request,res:Response)=>{
  const token=req.headers.authorization;
  await prisma.tokens.update({
    where:{
      token:token
    },
    data:{
      isValid:false
    }
  });
  res.status(200).json({"message":"Logout successful"});
}

export const refreshToken=async(req:Request, res:Response)=>{
  const refreshToken=req.headers.authorization;

const refreshPayload=  jwt.verify(
    refreshToken!, 
 refreshTokenKey    
) as any;
if(!refreshPayload){
  throw new BadRequest("Refresh token is not valid",ErrorCode.UNAUTHORIZED);
}
  const token=jwt.sign({
    id:refreshPayload.id,
  },
    tokenKey, 
    { expiresIn: '15m' }
  );
res.status(200).json({"token":token});

}