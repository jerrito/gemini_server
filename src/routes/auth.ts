import express from "express";
import { signin, signup, me, logOut as logout, refreshToken } from "../controllers/auth";
import { errorHandler } from "../error_handler";
import authMiddleware from "../middlewares/auth";
import { firebaseSignin, firebaseSignup, getFirebaseUser, logOut } from "../controllers/firebase/auth";
import firebaseAuthMiddleware from "../middlewares/firebase_auth";

const authRouter = express.Router();



//! signup
authRouter.post("/signup", errorHandler(signup));

//! signin
authRouter.post("/signin", errorHandler(signin));

//! get user
authRouter.get("/me", [authMiddleware], errorHandler(me));

//! log out 
authRouter.post("/logout",[authMiddleware], errorHandler(logout));

//! refresh token
authRouter.post("/refresh", errorHandler(refreshToken))


// Firebase

//! signup firebase
authRouter.post("/firebase/signup",errorHandler(firebaseSignup),);

//! signin
authRouter.post("/firebase/signin",errorHandler(firebaseSignin))


//! get firebase user
authRouter.get("/firebase/me",[firebaseAuthMiddleware as any],errorHandler(getFirebaseUser))

//! log out
authRouter.post("firebase/logout",[firebaseAuthMiddleware as any],errorHandler(logOut))


export default authRouter;