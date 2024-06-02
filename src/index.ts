import express, {Express,Request,Response} from "express"

import  {errorHandler}  from "./error_handler";
import { PrismaClient } from "@prisma/client";
import { PORT, cloudinaryApiKey, cloudinaryApiSecret } from "./secrets";
import { errorMiddleware } from "./middlewares/errot";
import rootRouter from "./routes/root";
import cloudinary from 'cloudinary';
import fs from "node:fs"
const app: Express=express();

app.use(express.json());

app.use(rootRouter);
app.get("/home",(req:Request,res:Response)=>{
    res.status(200).send("<h1>Home of app</>");
});
export const prismaClient=new PrismaClient({
    log:["query"],

})

app.use(errorMiddleware);


  

  
app.listen(Number(PORT),()=>{
    console.log(`Server is started at port ${PORT}`)
});