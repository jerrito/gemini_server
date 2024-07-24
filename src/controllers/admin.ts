import { Request, Response } from "express";
import { prisma } from "prisma_client";


export const AdminSignup = async (req: Request, res: Response) => {


    const { userName, email, password,subject } = req.body;

    const Admin = await prisma.admin.create({
        data: {
            userName, email, password,
            subject
        },

    });

    res.status(200).json({Admin})


};