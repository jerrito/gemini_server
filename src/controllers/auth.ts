import express, {Request,Response, NextFunction } from "express";
import cloudinary from 'cloudinary'
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from '../exceptions/root';
import { userValidation } from "../validation/user";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { tokenKey } from "../secrets";
import { NotFoundException } from "../exceptions/not_found";
import fs from "node:fs"
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

  const byteArrayBuffer = fs.readFileSync('../assets/god_of war.png');
  const uploadResult = await new Promise((resolve) => {
      cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
          return resolve(uploadResult);
      }).end(byteArrayBuffer);

  });

  console.log(uploadResult);

     user= await prisma.user.create({
        data:{
            userName,
            email:email,
            password:hashSync(password,10),
            profile:profile 
        }
    });
    res.status(200).json(user);

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
      tokenKey
    );
    res.status(200).json({
     "user":user,"token":token
    })

}

export const me=async(req:Request,res:Response)=>{
   

  return res.status(200).json(req?.user);
}
