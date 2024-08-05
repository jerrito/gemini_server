import express,{ Router } from "express";
import { errorHandler } from "../error_handler";
import { changePassword, deleteAccount, updatePicture, userProfileUpdate } from "../controllers/user";
import authMiddleware from "../middlewares/auth";
import { deleteFirebaseAccount, updateFirebasePicture, userUpdate } from "../controllers/firebase/user";


export const userRouter: Router = express.Router();


//! Profile Update
userRouter.put("/profile", [authMiddleware], errorHandler(userProfileUpdate,),);

//! Picture Update
userRouter.put("/profile/picture", [authMiddleware], errorHandler(updatePicture,),);


//! Change Password
userRouter.put("/profile/password", [authMiddleware], errorHandler(changePassword,),);

//! Delete Account
userRouter.delete("", [authMiddleware], errorHandler(deleteAccount,),);



//! FIREBASE ROUTES

//! firebase update user
userRouter.patch("/firebase/profile",errorHandler(userUpdate));

//! firebase update picture
userRouter.patch("/firebase/profile",errorHandler(updateFirebasePicture,),);

//! delete user 
userRouter.delete("/firebase/profile",errorHandler(deleteFirebaseAccount));