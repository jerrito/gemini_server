import express, {Request,Response, NextFunction } from "express";
import cloudinary from 'cloudinary';
import { any } from "zod";
import { prisma } from "../prisma_client";




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

