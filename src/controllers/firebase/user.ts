import { Response } from "express";
import { UserFirebase } from "../../types/index";
import { firebaseAdmin } from "../../index";
import { BadRequest } from "../../exceptions/bad_request";
import { ErrorCode } from "../../exceptions/root";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import cloudinary from 'cloudinary';
import { imageSchema } from "../../validation/user";

const uid="NrdJLtUCGed21strFNSgL0sJcj82";

export const userUpdate=async(req:UserFirebase,res:Response)=>{

    var email: any = req.query.email;
    var userName: any = req.query.userName;
    

   const user=await firebaseAdmin.auth().updateUser(
        uid,{
         email:email,
            displayName:userName
        }
    );
    res.status(200).json({user})
}

export const updateFirebasePicture=async(req:UserFirebase,res:Response)=>{
    const validatedImageArray = imageSchema.parse(req.body);
    let url: string = uid;
    const da = new Uint8Array(validatedImageArray.data);
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
    const user=await firebaseAdmin.auth().updateUser(
        uid,
        {
            photoURL:url
        }
    );

    res.status(200).json({"profile":user.photoURL})
}

export const deleteFirebaseAccount=async(req:UserFirebase,res:Response)=>{

    const user=await firebaseAdmin.auth().getUser(
        uid
    );
    if(!user){
        throw new BadRequest(
            "No user found with this uid",
            ErrorCode.NOT_FOUND
        )
    }
   const deletedUser= await firebaseAdmin.auth().deleteUser(
        uid
    );
    res.status(200).json({ "message": `${user.displayName} account deleted successfully` });

}