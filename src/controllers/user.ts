import express, { Request, Response, NextFunction } from "express";
import cloudinary from 'cloudinary';
import { any } from "zod";
import { prisma } from "../prisma_client";
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import fs from "node:fs"

// import pic from "../assets/images/download.jpeg";
// import kratos from "../assets/images/god_of war.png";
import { compareSync, hashSync } from "bcrypt";
import cloudinaryConfig from "index";

export const userProfileUpdate = async (req: Request, res: Response) => {

    const { userName } = req.body;

    const user = await prisma.user.update({
        where: {
            id: req.user?.id
        },
        data: {
            userName
        }
    });

    res.status(200).json(user);


}

export const updatePicture = async (req: Request, res: Response) => {
    const { data } = req.body;
    // const byteArrayBuffer = fs.readFileSync(pic);
    let url: string = "";
    try {

        const uploadResult = await new Promise((resolve) => {
            cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
                url = uploadResult?.secure_url!;
                console.log(url);
                (url);
                return resolve(uploadResult?.secure_url);
            }).end(data);

        });
    }
    catch (e) {
        throw new BadRequest(
            "Error uploading file ",
            ErrorCode.BAD_REQUEST
        );
    }



    const user = await prisma.user.update({
        where: {
            id: req?.user?.id
        },
        data: {
            profile: url
        }
    });

    res.status(200).json({ "profile": user.profile });
}


export const changePassword = async (req: Request, res: Response) => {

    const { old_password, new_password, confirm_password } = req.body;




    const user = await prisma.user.findFirstOrThrow({
        where: {
            id: req!.user!.id
        }
    });

    const checkOldPassword = compareSync(old_password, user.password);
    if (!checkOldPassword) {
        throw new BadRequest(
            "old password is incorrect",
            ErrorCode.Password_Wrong
        )
    }

    if (new_password !== confirm_password) {

        throw new BadRequest(
            "new password and confirm password are not same",
            ErrorCode.Password_Wrong
        );
    }
    const hashPassword = hashSync(new_password, 10);
    const userUpdate = await prisma.user.update({
        where: {
            id: req!.user!.id
        },
        data: {
            password: hashPassword
        }
    });
    res.status(200).json({ "message": "password changed successfully" });
}