"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryName = exports.cloudinaryApiSecret = exports.cloudinaryApiKey = exports.redisPort = exports.redisHost = exports.redisPassword = exports.refreshTokenKey = exports.tokenKey = exports.PORT = exports.firebaseKey = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
// firebase key
exports.firebaseKey = process.env.firebaseKey;
//port
exports.PORT = process.env.Port;
// refresh token
exports.tokenKey = process.env.tokenKey;
//refresh token
exports.refreshTokenKey = process.env.refreshTokenKey;
//redis password
exports.redisPassword = process.env.redisPassword;
// redis host
exports.redisHost = process.env.redisHost;
//redis port
exports.redisPort = process.env.redisPort;
//cloudinary api ey
exports.cloudinaryApiKey = process.env.cloudinaryApiKey;
//cloudinary api secret
exports.cloudinaryApiSecret = process.env.cloudinaryApiSecret;
// cloudinary Name
exports.cloudinaryName = process.env.cloudName;
