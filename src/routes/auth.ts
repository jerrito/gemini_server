import express from "express";
import { signin, signup, me } from "../controllers/auth";
import {errorHandler} from "../error_handler";
import authMiddleware from "../middlewares/auth";

const authRouter=express.Router();



// signup
authRouter.post("/signup",errorHandler(signup));

// signin
authRouter.post("/signin",errorHandler(signin));

//get user
authRouter.get("/me",[authMiddleware],errorHandler(me));



export default authRouter;