import { NextFunction, Request, Response } from "express";
import { dataSchema } from "../../validation/data";
import { data, firebaseAdmin } from "../../index";
import { UserFirebase } from "../../types/index";
import { BadRequest } from "../../exceptions/bad_request";
import { ErrorCode } from "../../exceptions/root";
import { prisma } from "../../prisma_client";
import cloudinary from 'cloudinary';

export const createFireStoreData = async (req: UserFirebase, res: Response, next: NextFunction) => {

    const validatedData = dataSchema.parse(req.body);
    let url = "";
    if (validatedData.hasImage) {
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
    const da = await data(req)
        .add(
            {
                "title": validatedData.title,
                "data": validatedData.data,
                "hasImage": validatedData.hasImage,
                "dataImage": url,
                "dateTime": Date.now()
            }
        );
    res.status(200).json((await da.get()).data())

}

export const getFirestoreDataById = async (req: UserFirebase, res: Response) => {
    const id = req.params.id.toString();

    console.log(id);

    try {
        const da = await data(req)
            .doc(id)
            .get();
        res.status(200).json(da.data());
    } catch (e: any) {
        throw new BadRequest("Document id cannot be found",
            ErrorCode.NOT_FOUND
        );
    }
}

export const listFirestoreData = async (req: UserFirebase, res: Response) => {
    let all: {}[] = [];
    let ids:String[]=[];
    const da = await data(req)
        .get();
    da.forEach(async (e) => {

        all.push(e.data());
        ids.push(e.id);


    });


    res.status(200).json({"list":all,"ids":ids} );
}

export const deleteFirestoreData = async (req: UserFirebase, res: Response) => {
    const id = req.params.id?.toString();

    try {
        const da = await data(req)
            .doc(id)
            .delete({
                exists: true
            });

    }
    catch (e: any) {

        throw new BadRequest(e.toString(),
            ErrorCode.NOT_FOUND)
    }
    res.status(200).json({ "success": true });


}

export const deleteListFirestoreData = async (req: UserFirebase, res: Response) => {
    const { list } = req.body;
    const batchDelete =  firebaseAdmin.firestore().batch();
    
    for (let i = 0; i < list.length; i++) {
        batchDelete.delete(data(req).doc(list[i]));
    }
    await batchDelete.commit();
    res.status(200).json({ "success": true });

}