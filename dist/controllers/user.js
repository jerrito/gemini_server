"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updatePicture = exports.userProfileUpdate = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const prisma_client_1 = require("../prisma_client");
const bad_request_1 = require("../exceptions/bad_request");
const root_1 = require("../exceptions/root");
// import pic from "../assets/images/download.jpeg";
// import kratos from "../assets/images/god_of war.png";
const bcrypt_1 = require("bcrypt");
const userProfileUpdate = async (req, res) => {
    var _a;
    var email = req.query.email;
    var userName = req.query.userName;
    console.log(email);
    console.log("jdj");
    const user = await prisma_client_1.prisma.user.update({
        where: {
            id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
        },
        data: {
            email,
            userName
        }
    });
    res.json(user);
};
exports.userProfileUpdate = userProfileUpdate;
const updatePicture = async (req, res) => {
    var _a;
    const data = req.query.data;
    // const byteArrayBuffer = fs.readFileSync(pic);
    let url = "";
    try {
        const uploadResult = await new Promise((resolve) => {
            cloudinary_1.default.v2.uploader.upload_stream((error, uploadResult) => {
                url = uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url;
                console.log(url);
                (url);
                return resolve(uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url);
            }).end(data);
        });
    }
    catch (e) {
        throw new bad_request_1.BadRequest(e.toString(), root_1.ErrorCode.BAD_REQUEST);
    }
    const user = await prisma_client_1.prisma.user.update({
        where: {
            id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id
        },
        data: {
            profile: url
        }
    });
    res.status(200).json({ "profile": user.profile });
};
exports.updatePicture = updatePicture;
const changePassword = async (req, res) => {
    const { old_password, new_password, confirm_password } = req.body;
    const user = await prisma_client_1.prisma.user.findFirstOrThrow({
        where: {
            id: req.user.id
        }
    });
    const checkOldPassword = (0, bcrypt_1.compareSync)(old_password, user.password);
    if (!checkOldPassword) {
        throw new bad_request_1.BadRequest("old password is incorrect", root_1.ErrorCode.Password_Wrong);
    }
    if (new_password !== confirm_password) {
        throw new bad_request_1.BadRequest("new password and confirm password are not same", root_1.ErrorCode.Password_Wrong);
    }
    const hashPassword = (0, bcrypt_1.hashSync)(new_password, 10);
    const userUpdate = await prisma_client_1.prisma.user.update({
        where: {
            id: req.user.id
        },
        data: {
            password: hashPassword
        }
    });
    res.status(200).json({ "message": "password changed successfully" });
};
exports.changePassword = changePassword;
