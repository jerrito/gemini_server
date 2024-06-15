"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const data_1 = require("../controllers/data");
const error_handler_1 = require("../error_handler");
const dataRoute = express_1.default.Router();
dataRoute.post("/data", [auth_1.default], (0, error_handler_1.errorHandler)(data_1.createData));
dataRoute.get("/data", [auth_1.default], (0, error_handler_1.errorHandler)(data_1.listData));
dataRoute.delete("/data/:id", [auth_1.default], (0, error_handler_1.errorHandler)(data_1.deleteData));
dataRoute.get("/data/:id", [auth_1.default], (0, error_handler_1.errorHandler)(data_1.getDataById));
exports.default = dataRoute;
