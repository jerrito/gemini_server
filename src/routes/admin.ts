import { AdminSignup } from "../controllers/admin";
import { errorHandler } from "../error_handler";
import express, { Router } from "express";
import authMiddleware from "../middlewares/auth";

const adminRouter: Router = express.Router();

adminRouter.post("/signup", [authMiddleware], errorHandler(AdminSignup,),);

export default adminRouter;