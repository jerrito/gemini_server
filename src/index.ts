import express, { Express, Request, Response } from "express"

import { errorHandler } from "./error_handler";
import { PrismaClient } from "@prisma/client";
import { PORT, cloudinaryApiKey, cloudinaryApiSecret, cloudinaryName, redisHost, redisPassword } from "./secrets";
import { errorMiddleware } from "./middlewares/error";
import rootRouter from "./routes/root";
import redis, { createClient } from 'redis';
import cloudinary from 'cloudinary';
import bodyParser from 'body-parser';

const app: Express = express();


app.use(express.json({
    limit: '50mb'
}));

// use root route
app.use(rootRouter);

app.use(bodyParser.json({ type: 'application/json', limit: '50mb' }));


//cloudinary config
export const cloudinaryConfig = cloudinary.v2.config({
    cloud_name: cloudinaryName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret
});

// redis client config
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


// use error middleware
app.use(errorMiddleware);



//port listening

app.listen(Number(PORT), () => {
    console.log(`Server is started at port ${PORT}`)
});