import { Router } from "express";
import  express  from 'express';
import { errorHandler } from "../error_handler";
import { userProfileUpdate } from "../controllers/user";
import authMiddleware from "../middlewares/auth";


export const userRouter:Router=express.Router();



userRouter.put("/user/update-profile" ,[authMiddleware],errorHandler(userProfileUpdate));



