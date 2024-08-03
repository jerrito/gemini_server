import express, { Request, Response, NextFunction } from "express";
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import { prisma } from "../prisma_client";
import { dataSchema, listDataSchema } from "../validation/data";
import cloudinary from 'cloudinary';
import { firebaseAdmin } from ".././index";

// create Data 
export const createData = async (req: Request, res: Response, next: NextFunction) => {
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
   
    const dataGenerated = await prisma.dataGenerated.create({
        data: {
            title: validatedData.title,
            dataImage:validatedData.hasImage? url : null,
            hasImage: validatedData.hasImage,
            userId: req!.user!.id!,
            data: validatedData.data
        }
    });
    // await firebaseAdmin().
    
    

    res.status(200).json(dataGenerated);

}


// list Data By Id
export const listData = async (req: Request, res: Response, next: NextFunction) => {
    const count = await prisma.dataGenerated.count();
    const data = await prisma.dataGenerated.findMany({
        take: 10,
        orderBy: {
            id: 'desc'
        },
        where: {
            userId: req!.user!.id!,
        }
    });
    if (data.length == 0) {
        throw new BadRequest(
            "No data found",
            ErrorCode.NOT_FOUND
        )
    }

    res.status(200).json(data);
}



// get Data By Id
export const getDataById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await prisma.dataGenerated.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        });

        res.status(200).json({ data });
    } catch (e) {

        throw new BadRequest(
            "Data not found",
            ErrorCode.BAD_REQUEST
        )
    }
}

// Delete Data
export const deleteData = async (req: Request, res: Response, next: NextFunction) => {

    try {
        await prisma.dataGenerated.delete({
            where: {
                id: +req.params.id
            }
        });

        res.status(200).json({ "success": true });

    } catch (e) {

        throw new BadRequest(
            "Error deleting data",
            ErrorCode.BAD_REQUEST
        )
    }
}


// Delete List Of Data
export const deleteMany = async (req: Request, res: Response) => {

    const { list } = req.body;
    const validationSchema = listDataSchema.parse(req.body);
    console.log(list);
    for (let i = 0; i < list.length; i++) {
        await prisma.dataGenerated.delete({

            where: {
                id: validationSchema.list[i]
                ,
                userId: req.user?.id
            }
        });

    }
    return res.status(200).json({ "success": true });
}