"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryApiSecret = exports.cloudinaryApiKey = exports.refreshTokenKey = exports.tokenKey = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
exports.PORT = process.env.Port;
exports.tokenKey = process.env.tokenKey;
exports.refreshTokenKey = process.env.refreshTokenKey;
exports.cloudinaryApiKey = process.env.cloudinaryApiKey;
exports.cloudinaryApiSecret = process.env.cloudinaryApiSecret;
