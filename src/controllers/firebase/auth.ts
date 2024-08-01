import {Request, Response } from "express";
import { firebaseAdmin } from "../../index";
import { userValidation } from "../../validation/user";
import { BadRequest } from "../../exceptions/bad_request";
import { ErrorCode } from "../../exceptions/root";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { UserFirebase } from "../../types/index";


export const firebaseSignup=async(req:Request,res:Response)=>{

  const userSchema=userValidation.parse(req.body);

 let  user:UserRecord;
 
   user=  await firebaseAdmin.auth().createUser({
      email: userSchema.email,
      emailVerified: false,
      phoneNumber: userSchema.phoneNumber,
      password: userSchema.password,
      displayName: userSchema.userName,
      disabled: false,
    });

res.status(200).json({user});

}

export const firebaseSignin=async(req:Request,res:Response)=>{
    const phoneNumber=req.query.phoneNumber;
    const email=req.query.email;
    console.log(phoneNumber)

    let user:UserRecord;
   if( phoneNumber !=null){
   user= await firebaseAdmin.auth().getUserByPhoneNumber(
        phoneNumber?.toString()
    )
    res.status(200).json({user});

} 
else{
  user= await firebaseAdmin.auth().getUserByEmail(
        email?.toString()!
    );
    res.status(200).json({user});
}

}

export const getFirebaseUser=async (req:UserFirebase,res:Response)=>{
   
    
  return  res.status(200).json(req?.firebaseUser)
}

export const refreshToken=async(req:Request,res:Response)=>{
  const refreshToken = req.headers.authorization;

    const decodedIdToken=await firebaseAdmin.auth().verifyIdToken(refreshToken!);
    if (!decodedIdToken) {
        throw new BadRequest("Refresh token is not valid", ErrorCode.UNAUTHORIZED);
      }
    const token=await firebaseAdmin.auth().createCustomToken(
       decodedIdToken.uid
    );
     res.status(200).json({"token":token})
}

export const logOut=async(req:UserFirebase,res:Response)=>{

  const token=await firebaseAdmin.auth().revokeRefreshTokens(
    req!.firebaseUser!.uid
  );
  res.status(200).json({ "message": "Logout successful" });

}

