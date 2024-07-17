import express, { Router } from "express";
import authRouter from "./auth";
import dataRoute from "./data";
import { userRouter } from "./user";
import cloudinary from 'cloudinary';
import { cloudinaryApiKey, cloudinaryApiSecret } from "../secrets";
import fs from 'node:fs';

const rootRouter:Router=express.Router();

// auth route
rootRouter.use("/api/auth",authRouter);


// data route
rootRouter.use("/api",dataRoute);

// user 
rootRouter.use("/api/user",userRouter)


  const data=async()=>{
    const mage='../assets/god_of war.png';
    cloudinary.v2.uploader.upload_large(mage).then(result => {
        console.log(result.secure_url);
      })
//   const byteArrayBuffer = fs.readFileSync('../assets/god_of war.png');
//   const uploadResult = await new Promise((resolve) => {
//       cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
//           return resolve(uploadResult);
//       }).end(byteArrayBuffer);

//       console.log(uploadResult);
      

//   });
  console.log(data);

//   console.log(uploadResult); 
  }
rootRouter.post("/ss",data)

export default rootRouter;