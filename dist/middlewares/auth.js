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
const root_1 = require("../exceptions/root");
const jwt = __importStar(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const unauthorized_1 = require("../exceptions/unauthorized");
const bad_request_1 = require("../exceptions/bad_request");
const prisma_client_1 = require("../prisma_client");
const connectionString = `${process.env.DATABASE_URL}`;
const authMiddleware = async (req, res, next) => {
    // 1. retrieve token from header 
    const token = req.headers.authorization;
    // 2.If present verify token is valid and extract payload
    if (token == undefined) {
        next(new unauthorized_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED));
    }
    const tokenBlackListed = await prisma_client_1.prisma.tokens.findFirst({
        where: {
            token: token,
            isValid: false
        }
    });
    if (tokenBlackListed) {
        next(new bad_request_1.BadRequest("Invalid token", root_1.ErrorCode.UNAUTHORIZED));
    }
    // client
    // .connect()
    // .then(async (client) => {
    //   console.log('connected');
    //   // Write your own code here
    //   const tokenBlackListed=await client.get("token");
    //   console.log(tokenBlackListed);
    //  if(tokenBlackListed !=null){
    //     next( new BadRequest("Invalid token",
    //         ErrorCode.UNAUTHORIZED,));
    //  }
    // })
    // .catch((err) => {
    //   next( new BadRequest("Unable to retrieve cache token",
    //     ErrorCode.UNAUTHORIZED,));
    //   console.log('err happened' + err);
    // });
    try {
        // 3. get the user fro payload
        const payload = jwt.verify(token, secrets_1.tokenKey);
        console.log(payload);
        // 4. Attach user to current request object
        const user = await prisma_client_1.prisma.user.findFirst({
            where: { id: Number(payload.id) }
        });
        if (!user) {
            return next(new unauthorized_1.UnauthorizedException("User not found", root_1.ErrorCode.NOT_FOUND));
        }
        req.user = user;
        next();
    }
    catch (e) {
        next(new unauthorized_1.UnauthorizedException("Unauthorization", root_1.ErrorCode.UNAUTHORIZED));
    }
};
exports.default = authMiddleware;
