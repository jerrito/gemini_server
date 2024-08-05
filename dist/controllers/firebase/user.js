"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFirebaseAccount = exports.updateFirebasePicture = exports.userUpdate = void 0;
const index_1 = require("../../index");
const bad_request_1 = require("../../exceptions/bad_request");
const root_1 = require("../../exceptions/root");
const cloudinary_1 = __importDefault(require("cloudinary"));
const user_1 = require("../../validation/user");
const userUpdate = async (req, res) => {
    var _a;
    var email = req.query.email;
    var userName = req.query.userName;
    const user = await index_1.firebaseAdmin.auth().updateUser((_a = req.firebaseUser) === null || _a === void 0 ? void 0 : _a.uid, {
        email: email,
        displayName: userName
    });
    res.status(200).json({ user });
};
exports.userUpdate = userUpdate;
const updateFirebasePicture = async (req, res) => {
    var _a, _b;
    const validatedImageArray = user_1.imageSchema.parse(req.body);
    let url = (_a = req.firebaseUser) === null || _a === void 0 ? void 0 : _a.uid;
    const da = new Uint8Array(validatedImageArray.data);
    try {
        const uploadResult = await new Promise((resolve) => {
            cloudinary_1.default.v2.uploader.upload_stream((error, uploadResult) => {
                url = uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url;
                console.log(url);
                console.log(error);
                return resolve(uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url);
            }).end(da);
        });
    }
    catch (e) {
        throw new bad_request_1.BadRequest(e.toString(), root_1.ErrorCode.BAD_REQUEST);
    }
    const user = await index_1.firebaseAdmin.auth().updateUser((_b = req.firebaseUser) === null || _b === void 0 ? void 0 : _b.uid, {
        photoURL: url
    });
    res.status(200).json({ "profile": user.photoURL });
};
exports.updateFirebasePicture = updateFirebasePicture;
const deleteFirebaseAccount = async (req, res) => {
    var _a, _b;
    const user = await index_1.firebaseAdmin.auth().getUser((_a = req.firebaseUser) === null || _a === void 0 ? void 0 : _a.uid);
    if (!user) {
        throw new bad_request_1.BadRequest("No user found with this req.firebaseUser?.uid", root_1.ErrorCode.NOT_FOUND);
    }
    const deletedUser = await index_1.firebaseAdmin.auth().deleteUser((_b = req.firebaseUser) === null || _b === void 0 ? void 0 : _b.uid);
    res.status(200).json({ "message": `${user.displayName} account deleted successfully` });
};
exports.deleteFirebaseAccount = deleteFirebaseAccount;
