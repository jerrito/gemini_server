import { Router } from "express";
import express from 'express';
import { errorHandler } from "../error_handler";
import { changePassword, updatePicture, userProfileUpdate } from "../controllers/user";
import authMiddleware from "../middlewares/auth";


export const userRouter: Router = express.Router();



userRouter.put("/profile", [authMiddleware], errorHandler(userProfileUpdate,),);

userRouter.put("/profile/picture", [authMiddleware], errorHandler(updatePicture,),);

userRouter.put("/profile/password", [authMiddleware], errorHandler(changePassword,),);

