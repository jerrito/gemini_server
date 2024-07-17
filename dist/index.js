"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = exports.client = exports.cloudinaryConfig = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const secrets_1 = require("./secrets");
const error_1 = require("./middlewares/error");
const root_1 = __importDefault(require("./routes/root"));
const redis_1 = require("redis");
const cloudinary_1 = __importDefault(require("cloudinary"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json({
    limit: '50mb'
}));
app.use(root_1.default);
app.use(body_parser_1.default.json({ type: 'application/json', limit: '50mb' }));
exports.cloudinaryConfig = cloudinary_1.default.v2.config({
    cloud_name: secrets_1.cloudinaryName,
    api_key: secrets_1.cloudinaryApiKey,
    api_secret: secrets_1.cloudinaryApiSecret
});
exports.client = (0, redis_1.createClient)({
    password: secrets_1.redisPassword,
    socket: {
        host: secrets_1.redisHost,
        port: 14611
    },
    legacyMode: true,
});
exports.prismaClient = new client_1.PrismaClient({
    log: ["query"],
});
app.use(error_1.errorMiddleware);
app.listen(Number(secrets_1.PORT), () => {
    console.log(`Server is started at port ${secrets_1.PORT}`);
});
