"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePicture = exports.userProfileUpdate = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const prisma_client_1 = require("../prisma_client");
const node_fs_1 = __importDefault(require("node:fs"));
const userProfileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { profile } = req.body;
    const user = yield prisma_client_1.prisma.user.update({
        where: {
            id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
        },
        data: {
            profile
        }
    });
    res.status(200).json(user);
});
exports.userProfileUpdate = userProfileUpdate;
const updatePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { data } = req.body;
    const byteArrayBuffer = node_fs_1.default.readFileSync('../assets/god_of war.png');
    const uploadResult = yield new Promise((resolve) => {
        cloudinary_1.default.v2.uploader.upload_stream((error, uploadResult) => {
            return resolve(uploadResult);
        }).end(byteArrayBuffer);
    });
    console.log(uploadResult);
    const user = yield prisma_client_1.prisma.user.update({
        where: {
            id: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id
        },
        data: {
            profile: data
        }
    });
    res.status(200).json({ "profile": user.profile });
});
exports.updatePicture = updatePicture;
