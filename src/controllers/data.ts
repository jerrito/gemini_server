import express, {Request,Response, NextFunction } from "express";
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import { prisma } from "../prisma_client";
import { dataSchema } from "../validation/data";


export const createData=async(req:Request,res:Response,next:NextFunction)=>{
    const {data,title, dataImage}=req.body
      const validatedData=dataSchema.parse(req.body);
    console.log(req!.user!.id!);
    const userData=await prisma.userData.create({ 
        data:{
            title:validatedData.title,
            dataImage:validatedData.dataImage,
            userId:req!.user!.id!,
            data:validatedData.data
        }
    });

    res.status(200).json(userData);

}


export const listData=async(req:Request,res:Response,next:NextFunction)=>{
    const count=await prisma.userData.count();
    const data=await prisma.userData.findMany({
        take:10,
        where:{         
            userId:req!.user!.id!,
        }
    });
    if(data.length == 0){
        throw new BadRequest(
            "No data found",
            ErrorCode.NOT_FOUND
        )
    }
    
    res.status(200).json(data);
}


export const getDataById=async(req:Request, res:Response)=>{
  try{
    const data=await prisma.userData.findFirstOrThrow({
        where:{
            id:+req.params.id
        }
    });
   
    res.status(200).json({data});
  }catch(e){

    throw new BadRequest(
        "Data not found",
        ErrorCode.BAD_REQUEST
    )
  }
}


export const deleteData=async(req:Request, res:Response)=>{

    try{
    await prisma.userData.delete({
        where:{
            id:+req.params.id  
        }
    });

    res.status(200).json({"success":true});

    }catch(e){

        throw new BadRequest(
            "Error deleting data",
            ErrorCode.BAD_REQUEST
        )
    }
}