"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const root_1 = require("../exceptions/root");
const unauthorized_1 = require("../exceptions/unauthorized");
var Role;
(function (Role) {
    Role[Role["User"] = 0] = "User";
    Role[Role["Admin"] = 1] = "Admin";
})(Role || (Role = {}));
const adminMiddleware = (req, res, next) => {
    if (req.user.role != "Admin") {
        throw new unauthorized_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED);
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
