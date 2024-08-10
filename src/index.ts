import express, { Express, Request, Response } from "express"

import { PrismaClient } from "@prisma/client";
import { PORT, cloudinaryApiKey, cloudinaryApiSecret, cloudinaryName, redisHost, redisPassword, redisPort } from "./secrets";
import { errorMiddleware } from "./middlewares/error";
import rootRouter from "./routes/root";
import redis, { createClient } from 'redis';
import cloudinary from 'cloudinary';
import bodyParser from 'body-parser';
import admin,{ initializeApp } from "firebase-admin";
import { UserFirebase } from "index";
const app: Express = express();

var serviceAccount = require("../firebase_key.json");

export  const firebaseAdmin=admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
   databaseURL: "firebase-adminsdk-la6na@jerrito-gemini-ai.iam.gserviceaccount.com"
});

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

export const data=(req:UserFirebase)=>
      firebaseAdmin.firestore().collection("data")
        .doc(req.firebaseUser?.uid)
        .collection("my_data");

// // redis client config
// export const client = createClient({
//     password: redisPassword,
//     socket: {
//         host: redisHost,
//         port: Number(redisPort)
//     },
//     legacyMode: true,
// });


export const prismaClient = new PrismaClient({
    log: ["query"],
})


// use error middleware
app.use(errorMiddleware);



//port listening

app.listen(Number(PORT), () => {
    console.log(`Server is started at port ${PORT}`)
});