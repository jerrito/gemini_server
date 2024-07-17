"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDataSchema = exports.dataSchema = void 0;
const zod_1 = require("zod");
exports.dataSchema = zod_1.z.object({
    data: zod_1.z.string(),
    dataImage: zod_1.z.any(),
    title: zod_1.z.string(),
    dataTime: zod_1.z.date(),
    hasImage: zod_1.z.boolean()
});
exports.listDataSchema = zod_1.z.object({
    list: zod_1.z.number().array().nonempty()
});
