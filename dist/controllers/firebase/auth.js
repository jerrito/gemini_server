"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.refreshToken = exports.getFirebaseUser = exports.firebaseSignin = exports.firebaseSignup = void 0;
const index_1 = require("../../index");
const user_1 = require("../../validation/user");
const bad_request_1 = require("../../exceptions/bad_request");
const root_1 = require("../../exceptions/root");
const firebaseSignup = async (req, res) => {
    var _a;
    const userSchema = user_1.userValidation.parse(req.body);
    let user;
    user = await index_1.firebaseAdmin.auth().updateUser((_a = req.firebaseUser) === null || _a === void 0 ? void 0 : _a.uid, {
        email: userSchema.email,
        emailVerified: false,
        phoneNumber: userSchema.phoneNumber,
        password: userSchema.password,
        displayName: userSchema.userName,
        disabled: false,
    });
    res.status(200).json({ user });
};
exports.firebaseSignup = firebaseSignup;
const firebaseSignin = async (req, res) => {
    var _a;
    const { email, phoneNumber, password } = req.body;
    console.log(phoneNumber);
    let user;
    if (phoneNumber != null) {
        user = await index_1.firebaseAdmin.auth().getUserByPhoneNumber(phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.toString());
        res.status(200).json(user);
    }
    else {
        // firebaseAdmin.firestore().collection("").where({}).add({})
        user = await index_1.firebaseAdmin.auth().getUserByEmail(email === null || email === void 0 ? void 0 : email.toString());
        console.log(user === null || user === void 0 ? void 0 : user.passwordSalt);
        if ((_a = password != (user === null || user === void 0 ? void 0 : user.passwordSalt)) !== null && _a !== void 0 ? _a : "") {
            throw new bad_request_1.BadRequest("Password doesn't match", root_1.ErrorCode.Password_Wrong);
        }
        res.status(200).json({ user });
    }
};
exports.firebaseSignin = firebaseSignin;
// eUi4TCnORoOSGw4hHQ95ip:APA91bFnKW4sITT6lHOknBhTNouR2DsQ0qUB4_WZ7Kgz8EXkLhcxhLcAq_47G0WMgRJIkcU4FVKQ_OWdb0zfIx387jZvn0qwSBuoSsWZjZpV9OwaxWoRseSsct31aB2KefagH7UccJ7n
const getFirebaseUser = async (req, res) => {
    var _a;
    return res.status(200).json((_a = req === null || req === void 0 ? void 0 : req.firebaseUser) !== null && _a !== void 0 ? _a : "User");
};
exports.getFirebaseUser = getFirebaseUser;
const refreshToken = async (req, res) => {
    const refreshToken = req.headers.authorization;
    const decodedIdToken = await index_1.firebaseAdmin.auth().verifyIdToken(refreshToken);
    if (!decodedIdToken) {
        throw new bad_request_1.BadRequest("Refresh token is not valid", root_1.ErrorCode.UNAUTHORIZED);
    }
    res.status(200).json({ "token": refreshToken });
};
exports.refreshToken = refreshToken;
const logOut = async (req, res) => {
    const token = await index_1.firebaseAdmin.auth().revokeRefreshTokens(req.firebaseUser.uid);
    res.status(200).json({ "message": "Logout successful" });
};
exports.logOut = logOut;
