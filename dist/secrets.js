"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryName = exports.cloudinaryApiSecret = exports.cloudinaryApiKey = exports.redisHost = exports.redisPassword = exports.refreshTokenKey = exports.tokenKey = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
//port
exports.PORT = process.env.Port;
// refresh toen
exports.tokenKey = process.env.tokenKey;
//refresh toen
exports.refreshTokenKey = process.env.refreshTokenKey;
//redis password
exports.redisPassword = process.env.redisPassword;
// redis host
exports.redisHost = process.env.redisHost;
//cloudinary api ey
exports.cloudinaryApiKey = process.env.cloudinaryApiKey;
//cloudinary api secret
exports.cloudinaryApiSecret = process.env.cloudinaryApiSecret;
// cloudinary Name
exports.cloudinaryName = process.env.cloudName;
