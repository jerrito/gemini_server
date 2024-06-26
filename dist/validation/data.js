"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSchema = void 0;
const zod_1 = require("zod");
exports.dataSchema = zod_1.z.object({
    data: zod_1.z.string(),
    dataImage: zod_1.z.any(),
    title: zod_1.z.string(),
    hasImage: zod_1.z.boolean()
});
