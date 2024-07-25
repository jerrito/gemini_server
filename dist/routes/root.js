"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const data_1 = __importDefault(require("./data"));
const user_1 = require("./user");
const admin_1 = __importDefault(require("./admin"));
const rootRouter = express_1.default.Router();
// auth route
rootRouter.use("/api/auth", auth_1.default);
// data route
rootRouter.use("/api", data_1.default);
// user 
rootRouter.use("/api/user", user_1.userRouter);
// admin
rootRouter.use("/api/admin", admin_1.default);
exports.default = rootRouter;
