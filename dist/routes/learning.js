"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const error_handler_1 = require("../error_handler");
const learning_1 = require("../controllers/learning");
const admin_1 = require("../middlewares/admin");
const learningRouter = express_1.default.Router();
learningRouter.post("/add", [auth_1.default, admin_1.adminMiddleware], (0, error_handler_1.errorHandler)(learning_1.addLearning));
exports.default = learningRouter;
