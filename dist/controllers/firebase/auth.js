"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.refreshToken = exports.getFirebaseUser = exports.firebaseSignup = void 0;
const index_1 = require("../../index");
const user_1 = require("../../validation/user");
const bad_request_1 = require("exceptions/bad_request");
const root_1 = require("exceptions/root");
const firebaseSignup = async (req, res) => {
    const userSchema = user_1.userValidation.parse(req.body);
    let user;
    user = await index_1.firebaseAdmin.auth().getUserByPhoneNumber(userSchema.phoneNumber);
    if (user) {
        throw new bad_request_1.BadRequest("User already exist", root_1.ErrorCode.BAD_REQUEST);
    }
    user = await index_1.firebaseAdmin.auth().createUser({
        email: userSchema.email,
        emailVerified: false,
        phoneNumber: userSchema.phoneNumber,
        password: userSchema.password,
        displayName: userSchema.userName,
        photoURL: '',
        disabled: false,
    });
    res.status(200).json({ user });
};
exports.firebaseSignup = firebaseSignup;
const firebaseSignin = async (req, res) => {
    const phoneNumber = req.query.params;
    const email = req.query.params;
    let user;
    if (phoneNumber != null) {
        user = await index_1.firebaseAdmin.auth().getUserByPhoneNumber(phoneNumber.toString());
        res.status(200).json({ user });
    }
    else {
        user = await index_1.firebaseAdmin.auth().getUserByEmail(email.toString());
        res.status(200).json({ user });
    }
};
const getFirebaseUser = async (req, res) => {
    return res.status(200).json(req.firebaseUser);
};
exports.getFirebaseUser = getFirebaseUser;
const refreshToken = async (req, res) => {
    const refreshToken = req.headers.authorization;
    const decodedIdToken = await index_1.firebaseAdmin.auth().verifyIdToken(refreshToken);
    if (!decodedIdToken) {
        throw new bad_request_1.BadRequest("Refresh token is not valid", root_1.ErrorCode.UNAUTHORIZED);
    }
    const token = await index_1.firebaseAdmin.auth().createCustomToken(decodedIdToken.uid);
    res.status(200).json({ "token": token });
};
exports.refreshToken = refreshToken;
const logOut = async (req, res) => {
    const token = await index_1.firebaseAdmin.auth().revokeRefreshTokens(req.firebaseUser.uid);
    res.status(200).json({ "message": "Logout successful" });
};
exports.logOut = logOut;
