import express, { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { createData, deleteData, getDataById, listData } from "../controllers/data";
import { errorHandler } from "../error_handler";


const dataRoute:Router=express.Router();

dataRoute.post("/data",[authMiddleware],errorHandler(createData));
dataRoute.get("/data",[authMiddleware],errorHandler(listData));
dataRoute.delete("/data/:id",[authMiddleware],errorHandler(deleteData));
dataRoute.get("/data/:id",[authMiddleware],errorHandler(getDataById));


export default dataRoute;