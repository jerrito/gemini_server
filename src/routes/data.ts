import express, { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { createData, deleteData, deleteMany, getDataById, listData } from "../controllers/data";
import { errorHandler } from "../error_handler";


const dataRoute: Router = express.Router();

//! Create  Data
dataRoute.post("/data", [authMiddleware], errorHandler(createData));

//! List Data
dataRoute.get("/data", [authMiddleware], errorHandler(listData));

// Delete Data
dataRoute.delete("/data/:id", [authMiddleware], errorHandler(deleteData));

//! DeleteMany 
dataRoute.delete("/data/delete/list", [authMiddleware], errorHandler(deleteMany));

//! Get Data By Id
dataRoute.get("/data/:id", [authMiddleware], errorHandler(getDataById));


export default dataRoute;