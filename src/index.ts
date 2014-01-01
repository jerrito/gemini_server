import express, {Express,Request,Response} from "express"

import  {errorHandler}  from "./error_handler";
import { PrismaClient } from "@prisma/client";
import { PORT, cloudinaryApiKey, cloudinaryApiSecret } from "./secrets";
import { errorMiddleware } from "./middlewares/errot";
import rootRouter from "./routes/root";
import redis, { createClient } from 'redis';
import util  from "util";
const app: Express=express();

app.use(express.json());

app.use(rootRouter);
interface tokenModule{
    token:string,
    isValid:boolean
}

export const client = createClient({
    password: 'vdU1XGlbkHGttyobsqSP8L94doTIcMg2',
    socket: {
        host: 'redis-14611.c73.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 14611
    },
    legacyMode: true,
})

// export const client=()=>await clientGet.then();

export const prismaClient=new PrismaClient({
    log:["query"],

})

app.use(errorMiddleware);


  

  
app.listen(Number(PORT),()=>{
    console.log(`Server is started at port ${PORT}`)
});