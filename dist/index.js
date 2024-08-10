"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = exports.data = exports.cloudinaryConfig = exports.firebaseAdmin = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const secrets_1 = require("./secrets");
const error_1 = require("./middlewares/error");
const root_1 = __importDefault(require("./routes/root"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const body_parser_1 = __importDefault(require("body-parser"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app = (0, express_1.default)();
var serviceAccount = require("../firebase_key.json");
exports.firebaseAdmin = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "firebase-adminsdk-la6na@jerrito-gemini-ai.iam.gserviceaccount.com"
});
app.use(express_1.default.json({
    limit: '50mb'
}));
// use root route
app.use(root_1.default);
app.use(body_parser_1.default.json({ type: 'application/json', limit: '50mb' }));
//cloudinary config
exports.cloudinaryConfig = cloudinary_1.default.v2.config({
    cloud_name: secrets_1.cloudinaryName,
    api_key: secrets_1.cloudinaryApiKey,
    api_secret: secrets_1.cloudinaryApiSecret
});
const data = (req) => {
    var _a;
    return exports.firebaseAdmin.firestore().collection("data")
        .doc((_a = req.firebaseUser) === null || _a === void 0 ? void 0 : _a.uid)
        .collection("my_data");
};
exports.data = data;
// // redis client config
// export const client = createClient({
//     password: redisPassword,
//     socket: {
//         host: redisHost,
//         port: Number(redisPort)
//     },
//     legacyMode: true,
// });
exports.prismaClient = new client_1.PrismaClient({
    log: ["query"],
});
// use error middleware
app.use(error_1.errorMiddleware);
//port listening
app.listen(Number(secrets_1.PORT), () => {
    console.log(`Server is started at port ${secrets_1.PORT}`);
});
