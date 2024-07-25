import { Role } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prisma_client";


export const AdminSignup = async (req: Request, res: Response) => {


    const { subject, role } = req.body;

    const Admin = await prisma.admin.create({
        data: {
            userId:req?.user!.id,
            subject,
            isApproved:true

        },

    });
    const updateRole=await prisma.user.update({
        where:{
            id:req?.user!.id
        },
        data:{
            role:Role.Admin
        }
    })

    res.status(200).json({ Admin,updateRole })


};