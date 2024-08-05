"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSchema = exports.passwordSchema = exports.userValidation = void 0;
const zod_1 = require("zod");
// user schema
exports.userValidation = zod_1.z.object({
    userName: (0, zod_1.string)().min(2, "Username must be more than 2 or more characters long"),
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(6, "Password must be 6 or more characters long"),
    phoneNumber: (0, zod_1.string)()
});
// password schema
exports.passwordSchema = zod_1.z.object({
    old_password: (0, zod_1.string)().min(6),
    new_password: (0, zod_1.string)().min(6),
    confirm_password: (0, zod_1.string)().min(6),
});
//image schema
exports.imageSchema = zod_1.z.object({
    data: (0, zod_1.number)().array(),
});
