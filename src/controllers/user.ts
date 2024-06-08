import express, {Request,Response, NextFunction } from "express";
import cloudinary from 'cloudinary';
import { any } from "zod";
import { prisma } from "../prisma_client";
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import fs from "node:fs"



export const userProfileUpdate=async(req:Request,res:Response)=>{

    const {profile}=req.body;

    const user=await prisma.user.update({
        where: {
            id: req.user?.id
        },
        data: {
            profile
        }
    });

    res.status(200).json(user)


}

export  const updatePicture=async(req:Request, res:Response)=>{
  
    const {data}=req.body;
    const byteArrayBuffer = fs.readFileSync('../assets/god_of war.png');
    const uploadResult = await new Promise((resolve) => {
        cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
            return resolve(uploadResult);
        }).end(byteArrayBuffer);
  
    });
  
    console.log(uploadResult);
    const user= await prisma.user.update({
        where:{
            id:req?.user?.id
        },
        data:{
            profile:data
        }
    });
    
   res.status(200).json({"profile":user.profile});
}

