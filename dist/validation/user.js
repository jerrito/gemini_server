"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
exports.userValidation = zod_1.z.object({
    userName: (0, zod_1.string)().min(2, "Username must be more than 2 or more characters long"),
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(6, "Password must be 6 or more characters long")
});
