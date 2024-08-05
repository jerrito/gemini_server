"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("../error_handler");
const user_1 = require("../controllers/user");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_2 = require("../controllers/firebase/user");
exports.userRouter = express_1.default.Router();
//! Profile Update
exports.userRouter.put("/profile", [auth_1.default], (0, error_handler_1.errorHandler)(user_1.userProfileUpdate));
//! Picture Update
exports.userRouter.put("/profile/picture", [auth_1.default], (0, error_handler_1.errorHandler)(user_1.updatePicture));
//! Change Password
exports.userRouter.put("/profile/password", [auth_1.default], (0, error_handler_1.errorHandler)(user_1.changePassword));
//! Delete Account
exports.userRouter.delete("", [auth_1.default], (0, error_handler_1.errorHandler)(user_1.deleteAccount));
//! FIREBASE ROUTES
//! firebase update user
exports.userRouter.patch("/firebase/profile", (0, error_handler_1.errorHandler)(user_2.userUpdate));
//! firebase update picture
exports.userRouter.patch("/firebase/profile", (0, error_handler_1.errorHandler)(user_2.updateFirebasePicture));
//! delete user 
exports.userRouter.delete("/firebase/profile", (0, error_handler_1.errorHandler)(user_2.deleteFirebaseAccount));
