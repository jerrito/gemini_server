import express, { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error_handler";
import { addLearning } from "../controllers/learning";
import { adminMiddleware } from "../middlewares/admin";



const learningRouter: Router = express.Router();

learningRouter.post("/add", [authMiddleware, adminMiddleware], errorHandler(addLearning))

export default learningRouter;