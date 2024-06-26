"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.logOut = exports.me = exports.signin = exports.signup = void 0;
const bad_request_1 = require("../exceptions/bad_request");
const root_1 = require("../exceptions/root");
const user_1 = require("../validation/user");
const bcrypt_1 = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const not_found_1 = require("../exceptions/not_found");
const prisma_client_1 = require("../prisma_client");
const signup = async (req, res, next) => {
    user_1.userValidation.parse(req.body);
    const { userName, email, password, profile } = req.body;
    let user = await prisma_client_1.prisma.user.findFirst({
        where: {
            email: email,
            userName: userName
        }
    });
    if (user) {
        throw new bad_request_1.BadRequest("User already exist", root_1.ErrorCode.BAD_REQUEST);
    }
    user = await prisma_client_1.prisma.user.create({
        data: {
            userName,
            email: email,
            password: (0, bcrypt_1.hashSync)(password, 10),
        }
    });
    const refreshToken = jwt.sign({
        id: user.id,
    }, secrets_1.refreshTokenKey, { expiresIn: '2 days' });
    res.status(200).json({ "user": user, "refreshToken": refreshToken });
};
exports.signup = signup;
const signin = async (req, res, next) => {
    const { email, userName, password, tokenData } = req.body;
    const user = await prisma_client_1.prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (!user) {
        throw new not_found_1.NotFoundException("User not found", root_1.ErrorCode.NOT_FOUND);
    }
    const checkPassword = (0, bcrypt_1.compareSync)(password, user === null || user === void 0 ? void 0 : user.password);
    if (!checkPassword) {
        throw new bad_request_1.BadRequest("Password incorrect", root_1.ErrorCode.BAD_REQUEST);
    }
    const token = jwt.sign({
        id: user.id,
    }, secrets_1.tokenKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign({
        id: user.id,
    }, secrets_1.refreshTokenKey, { expiresIn: '2 days' });
    const s = await prisma_client_1.prisma.tokens.createMany({
        data: [{
                token: token,
                userId: user.id
            },
            { token: refreshToken,
                userId: user.id
            }
        ],
    });
    res.status(200).json({
        "user": user, "token": token, "refreshToken": refreshToken
    });
};
exports.signin = signin;
const me = async (req, res) => {
    return res.status(200).json(req === null || req === void 0 ? void 0 : req.user);
};
exports.me = me;
const logOut = async (req, res) => {
    //: TODO freshly signed up user can't log out
    const token = req.headers.authorization;
    //  try{client.connect()
    //   .then(async (client) => {
    //     console.log('connected');
    //     // Write your own code here
    //     const t=await client.set("token",token!);
    //     console.log(t);
    //   })}
    //   catch(err) {
    //    throw  new BadRequest("Unable to retrieve cache token",
    //       ErrorCode.UNAUTHORIZED,);
    //     // console.log('err happened' + err);
    //   };
    //   await  client.quit();
    await prisma_client_1.prisma.tokens.update({
        where: {
            token: token
        },
        data: {
            isValid: false
        }
    });
    res.status(200).json({ "message": "Logout successful" });
};
exports.logOut = logOut;
const refreshToken = async (req, res) => {
    const refreshToken = req.headers.authorization;
    const refreshPayload = jwt.verify(refreshToken, secrets_1.refreshTokenKey);
    if (!refreshPayload) {
        throw new bad_request_1.BadRequest("Refresh token is not valid", root_1.ErrorCode.UNAUTHORIZED);
    }
    const token = jwt.sign({
        id: refreshPayload.id,
    }, secrets_1.tokenKey, { expiresIn: '1h' });
    await prisma_client_1.prisma.tokens.create({
        data: {
            token: token,
            userId: refreshPayload.id,
        },
    });
    res.status(200).json({ "token": token });
};
exports.refreshToken = refreshToken;
