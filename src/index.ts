import express, { Express, Request, Response } from "express"

import { errorHandler } from "./error_handler";
import { PrismaClient } from "@prisma/client";
import { PORT, cloudinaryApiKey, cloudinaryApiSecret, redisHost, redisPassword } from "./secrets";
import { errorMiddleware } from "./middlewares/errot";
import rootRouter from "./routes/root";
import redis, { createClient } from 'redis';
import cloudinary from 'cloudinary';
import bodyParser from 'body-parser';

import util from "util";
const app: Express = express();


app.use(express.json());

app.use(rootRouter);

app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '10mb' }));

export const cloudinaryConfig = cloudinary.v2.config({
    cloud_name: 'du6xt1im8',
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret
});

export const client = createClient({
    password: redisPassword,
    socket: {
        host: redisHost,
        port: 14611
    },
    legacyMode: true,
})



export const prismaClient = new PrismaClient({
    log: ["query"],

})

app.use(errorMiddleware);





app.listen(Number(PORT), () => {
    console.log(`Server is started at port ${PORT}`)
});