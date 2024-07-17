import express, { Request, Response, NextFunction } from "express";
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import { prisma } from "../prisma_client";
import { dataSchema, listDataSchema } from "../validation/data";


export const createData = async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = dataSchema.parse(req.body);
    console.log(req!.user!.id!);
    const dataGenerated = await prisma.dataGenerated.create({
        data: {
            title: validatedData.title,
            dataImage: validatedData.dataImage,
            hasImage: validatedData.hasImage,
            userId: req!.user!.id!,
            data: validatedData.data
        }
    });

    res.status(200).json(dataGenerated);

}


export const listData = async (req: Request, res: Response, next: NextFunction) => {
    const count = await prisma.dataGenerated.count();
    const data = await prisma.dataGenerated.findMany({
        take: 10,
        orderBy:{
            id:'asc' 
        },
        where: {
            userId: req!.user!.id!,
        },
        select:{
            title:true
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