"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const error_handler_1 = require("../error_handler");
const auth_2 = __importDefault(require("../middlewares/auth"));
const authRouter = express_1.default.Router();
// signup
authRouter.post("/signup", (0, error_handler_1.errorHandler)(auth_1.signup));
// signin
authRouter.post("/signin", (0, error_handler_1.errorHandler)(auth_1.signin));
//get user
authRouter.get("/me", [auth_2.default], (0, error_handler_1.errorHandler)(auth_1.me));
//log out 
authRouter.post("/logout", (0, error_handler_1.errorHandler)(auth_1.logOut));
// refresh token
authRouter.post("/refresh", (0, error_handler_1.errorHandler)(auth_1.refreshToken));
exports.default = authRouter;
