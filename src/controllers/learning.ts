import { prisma } from "../prisma_client";
import { Request, Response } from "express";

export const addLearning = async (req: Request, res: Response) => {
    const { title, data, url } = req.body;
    const learnData = await prisma.learning.create({
        data: {
            title,
            data,
            url,
        }
    })

    res.status(200).json({learnData});
}