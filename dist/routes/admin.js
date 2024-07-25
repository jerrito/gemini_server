"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../controllers/admin");
const error_handler_1 = require("../error_handler");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const adminRouter = express_1.default.Router();
adminRouter.post("/signup", [auth_1.default], (0, error_handler_1.errorHandler)(admin_1.AdminSignup));
exports.default = adminRouter;
