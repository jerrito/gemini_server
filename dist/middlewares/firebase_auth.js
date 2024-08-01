"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require(".././index");
const bad_request_1 = require("exceptions/bad_request");
const root_1 = require("exceptions/root");
const unauthorized_1 = require("exceptions/unauthorized");
const firebaseAuthMiddleware = async (req, res, next) => {
    var _a;
    const token = req.headers.authorization;
    const decodedIdToken = await index_1.firebaseAdmin.auth().verifyIdToken(token);
    if (decodedIdToken.uid == null) {
        throw new bad_request_1.BadRequest("Invalid token", root_1.ErrorCode.UNAUTHORIZED);
    }
    ;
    let user = await index_1.firebaseAdmin.auth().getUserByPhoneNumber((_a = decodedIdToken === null || decodedIdToken === void 0 ? void 0 : decodedIdToken.phone_number) !== null && _a !== void 0 ? _a : "");
    if (!user) {
        return next(new unauthorized_1.UnauthorizedException("User not found", root_1.ErrorCode.NOT_FOUND));
    }
    req.firebaseUser = user;
    next();
};
exports.default = firebaseAuthMiddleware;
