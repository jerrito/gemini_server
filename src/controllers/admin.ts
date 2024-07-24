import { Request, Response } from "express";
import { prisma } from "prisma_client";


export const AdminSignup = async (req: Request, res: Response) => {


    const { userName, email, password,subject ,role} = req.body;

    const Admin = await prisma.user.create({
        data: {
            userName, email, password,
            
        },

    });

    res.status(200).json({Admin})


};