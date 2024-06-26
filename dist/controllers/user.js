"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePicture = exports.userProfileUpdate = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const prisma_client_1 = require("../prisma_client");
const node_fs_1 = __importDefault(require("node:fs"));
const userProfileUpdate = async (req, res) => {
    var _a;
    const { profile } = req.body;
    const user = await prisma_client_1.prisma.user.update({
        where: {
            id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
        },
        data: {
            profile
        }
    });
    res.status(200).json(user);
};
exports.userProfileUpdate = userProfileUpdate;
const updatePicture = async (req, res) => {
    var _a;
    const { data } = req.body;
    const byteArrayBuffer = node_fs_1.default.readFileSync('../assets/god_of war.png');
    const uploadResult = await new Promise((resolve) => {
        cloudinary_1.default.v2.uploader.upload_stream((error, uploadResult) => {
            return resolve(uploadResult);
        }).end(byteArrayBuffer);
    });
    console.log(uploadResult);
    const user = await prisma_client_1.prisma.user.update({
        where: {
            id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id
        },
        data: {
            profile: data
        }
    });
    res.status(200).json({ "profile": user.profile });
};
exports.updatePicture = updatePicture;
