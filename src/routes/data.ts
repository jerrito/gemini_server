import express, { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { createData, deleteData, deleteMany, getDataById, listData } from "../controllers/data";
import { errorHandler } from "../error_handler";
import firebaseAuthMiddleware from "../middlewares/firebase_auth";
import { createFireStoreData, deleteFirestoreData, deleteListFirestoreData, getFirestoreDataById, listFirestoreData } from "../controllers/firebase/data";


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


//! FIRESTORE TRANSACTIONS

//! Create Data Firebase
dataRoute.post("/firestore/data", [firebaseAuthMiddleware as any], errorHandler(createFireStoreData));

//! get document by id 
dataRoute.get("/firestore/data", [firebaseAuthMiddleware as any], errorHandler(getFirestoreDataById));


//! list firestore data
dataRoute.get("/firestore/datas", errorHandler(listFirestoreData));

//! delete firestore data
dataRoute.delete("/firestore/data", [firebaseAuthMiddleware as any], errorHandler(deleteFirestoreData),);

//! delete firestore list data
dataRoute.delete("/firestore/data/list",  errorHandler(deleteListFirestoreData),);

export default dataRoute;