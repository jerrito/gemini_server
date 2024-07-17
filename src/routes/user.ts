import { Router } from "express";
import express from 'express';
import { errorHandler } from "../error_handler";
import { changePassword, updatePicture, userProfileUpdate } from "../controllers/user";
import authMiddleware from "../middlewares/auth";


export const userRouter: Router = express.Router();


//! Profile Update
userRouter.put("/profile", [authMiddleware], errorHandler(userProfileUpdate,),);

//! Picture Update
userRouter.put("/profile/picture", [authMiddleware], errorHandler(updatePicture,),);


//! Change Password
userRouter.put("/profile/password", [authMiddleware], errorHandler(changePassword,),);

