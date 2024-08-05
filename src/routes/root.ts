import express, { Router } from "express";
import authRouter from "./auth";
import dataRoute from "./data";
import { userRouter } from "./user";
import cloudinary from 'cloudinary';
import { cloudinaryApiKey, cloudinaryApiSecret } from "../secrets";
import fs from 'node:fs';
import adminRouter from "./admin";
import learningRouter  from "./learning";

const rootRouter: Router = express.Router();

// auth route
rootRouter.use("/api/auth", authRouter);


// data route
rootRouter.use("/api", dataRoute);

// user 
rootRouter.use("/api/user", userRouter)

// admin
rootRouter.use("/api/admin", adminRouter)

// learning
rootRouter.use("/learning", learningRouter);
export default rootRouter;