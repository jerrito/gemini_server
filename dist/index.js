"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const secrets_1 = require("./secrets");
const errot_1 = require("./middlewares/errot");
const root_1 = __importDefault(require("./routes/root"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(root_1.default);
app.get("/home", (req, res) => {
    res.status(200).send("<h1>Home of app</>");
});
exports.prismaClient = new client_1.PrismaClient({
    log: ["query"],
});
app.use(errot_1.errorMiddleware);
app.listen(Number(secrets_1.PORT), () => {
    console.log(`Server is started at port ${secrets_1.PORT}`);
});
