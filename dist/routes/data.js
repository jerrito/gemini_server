"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const data_1 = require("../controllers/data");
const error_handler_1 = require("../error_handler");
const firebase_auth_1 = __importDefault(require("../middlewares/firebase_auth"));
const data_2 = require("../controllers/firebase/data");
const dataRoute = express_1.default.Router();
//! Create  Data
dataRoute.post("/data", [auth_1.default], (0, error_handler_1.errorHandler)(data_1.createData));
//! List Data
dataRoute.get("/data", [auth_1.default], (0, error_handler_1.errorHandler)(data_1.listData));
// Delete Data
dataRoute.delete("/data/:id", [auth_1.default], (0, error_handler_1.errorHandler)(data_1.deleteData));
//! DeleteMany 
dataRoute.delete("/data/delete/list", [auth_1.default], (0, error_handler_1.errorHandler)(data_1.deleteMany));
//! Get Data By Id
dataRoute.get("/data/:id", [auth_1.default], (0, error_handler_1.errorHandler)(data_1.getDataById));
//! FIRESTORE TRANSACTIONS
//! Create Data Firebase
dataRoute.post("/firestore/data", [firebase_auth_1.default], (0, error_handler_1.errorHandler)(data_2.createFireStoreData));
//! get document by id 
dataRoute.get("/firestore/data", [firebase_auth_1.default], (0, error_handler_1.errorHandler)(data_2.getFirestoreDataById));
//! list firestore data
dataRoute.get("/firestore/datas", (0, error_handler_1.errorHandler)(data_2.listFirestoreData));
//! delete firestore data
dataRoute.delete("/firestore/data", [firebase_auth_1.default], (0, error_handler_1.errorHandler)(data_2.deleteFirestoreData));
//! delete firestore list data
dataRoute.delete("/firestore/data/list", (0, error_handler_1.errorHandler)(data_2.deleteListFirestoreData));
exports.default = dataRoute;
