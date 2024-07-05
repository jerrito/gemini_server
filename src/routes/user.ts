import { Router } from "express";
import express from 'express';
import { errorHandler } from "../error_handler";
import { changePassword, updatePicture, userProfileUpdate } from "../controllers/user";
import authMiddleware from "../middlewares/auth";


export const userRouter: Router = express.Router();



userRouter.put("/user/update-profile", [authMiddleware], errorHandler(userProfileUpdate,),);

userRouter.put("/user/profile", [authMiddleware], errorHandler(updatePicture,),);

userRouter.put("/user/profile/password", [authMiddleware], errorHandler(changePassword,),);

