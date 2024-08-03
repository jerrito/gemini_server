import {  NextFunction, Response } from "express";
import { dataSchema } from "../../validation/data";
import { firebaseAdmin } from "../../index";
import { UserFirebase } from "../../types/index";
import { BadRequest } from "../../exceptions/bad_request";
import { ErrorCode } from "../../exceptions/root";
import { prisma } from "../../prisma_client";
import cloudinary from 'cloudinary';

export const createFireStoreData=async(req:UserFirebase,res:Response, next:NextFunction)=>{
    const validatedData = dataSchema.parse(req.body);
    let url="";
    if(validatedData.hasImage){
        const da = new Uint8Array(validatedData.dataImage);
    
    try {
        const uploadResult = await new Promise((resolve) => {
            cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
                url = uploadResult?.secure_url!;
                console.log(url);
                console.log(error);
                return resolve(uploadResult?.secure_url);
            }
            ).end(da);

        });
    }
    catch (e: any) {
        throw new BadRequest(
            e.toString(),
            ErrorCode.BAD_REQUEST
        );
    }
}
    const data=await firebaseAdmin.firestore().collection("data")
    .doc(req.firebaseUser.uid).create(
        {
          "title":  validatedData.title,
            "data":validatedData.data,
            "hasImage":validatedData.hasImage,
            "dataImage":validatedData.dataImage,
            "dateTime":Date.now()
        }
    );
    res.status(200).json({data})

}