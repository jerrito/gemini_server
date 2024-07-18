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
import { imageSchema, passwordSchema } from "../validation/user";


// update user profile
export const userProfileUpdate = async (req: Request, res: Response) => {
    var email: any = req.query.email;
    var userName: any = req.query.userName;

    const checkAlreadyExist = await prisma.user.findFirstOrThrow({
        where: {
            email,
            userName
        }
    });
    if (checkAlreadyExist) {
        throw new BadRequest(
            email ? "UserName already exist" : "Email already exist",
            ErrorCode.BAD_REQUEST
        );
    }

    const user = await prisma.user.update({
        where: {
            id: req.user?.id
        },
        data: {
            email,
            userName
        }
    });
    res.status(200).json({ "userName": user.userName, "email": user.email });

}


// update profile picture
export const updatePicture = async (req: Request, res: Response) => {
    const { data } = req.body;
    const validatedImageArray = imageSchema.parse(req.body);
    let url: string = "";
    const da = new Uint8Array(validatedImageArray.data);
    console.log(da);
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


//change password
export const changePassword = async (req: Request, res: Response) => {

    const passwordValidator = passwordSchema.parse(req.body);

    const user = await prisma.user.findFirstOrThrow({
        where: {
            id: req!.user!.id
        }
    });

    const checkOldPassword = compareSync(passwordValidator.old_password, user.password);
    if (!checkOldPassword) {
        throw new BadRequest(
            "old password is incorrect",
            ErrorCode.Password_Wrong
        )
    }

    if (passwordValidator.new_password !== passwordValidator.confirm_password) {

        throw new BadRequest(
            "new password and confirm password are not same",
            ErrorCode.Password_Wrong
        );
    }
    const hashPassword = hashSync(passwordValidator.new_password, 10);
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