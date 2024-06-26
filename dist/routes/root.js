"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const data_1 = __importDefault(require("./data"));
const user_1 = require("./user");
const cloudinary_1 = __importDefault(require("cloudinary"));
const secrets_1 = require("../secrets");
const rootRouter = express_1.default.Router();
// auth route
rootRouter.use("/api/auth", auth_1.default);
// data route
rootRouter.use("/api", data_1.default);
// user 
rootRouter.use("/api", user_1.userRouter);
cloudinary_1.default.v2.config({
    cloud_name: 'du6xt1im8',
    api_key: secrets_1.cloudinaryApiKey,
    api_secret: secrets_1.cloudinaryApiSecret
});
const data = async () => {
    const mage = '../assets/god_of war.png';
    cloudinary_1.default.v2.uploader.upload(mage).then(result => {
        console.log(result);
    });
    //   const byteArrayBuffer = fs.readFileSync('../assets/god_of war.png');
    //   const uploadResult = await new Promise((resolve) => {
    //       cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
    //           return resolve(uploadResult);
    //       }).end(byteArrayBuffer);
    //       console.log(uploadResult);
    //   });
    console.log(data);
    //   console.log(uploadResult); 
};
rootRouter.post("/ss", data);
exports.default = rootRouter;
