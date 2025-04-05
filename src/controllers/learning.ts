import { prisma } from "../prisma_client";
import { Request, Response } from "express";
export const addLearning = async (req: Request, res: Response) => {
    const { title, data, url } = req.body;
    const user = await prisma.user.findFirstOrThrow({
        where: {
            id: req?.user!.id
        }
    });
    const admin = await prisma.admin.findFirstOrThrow({
        where: {
            userId: user.id
        }
    })
    let learnData;
    const learnDataExist = await prisma.learning.findFirst({
        where: {
            adminId: admin.id
        }
    });

    if (!learnDataExist) {
        learnData = await prisma.learning.create({
            data: {
                adminId: admin.id,
            }
        });


        const learningResources = await prisma.learningResource.create({
            data: {
                data,
                title,
                learningId: learnData.id
            }
        })
        res.status(200).json({ learningResources });
    }
    else {
        const learningResources = await prisma.learningResource.create({
            data: {
                data,
                title,
                learningId: learnDataExist.id
            }
        })
        res.status(200).json({ learningResources });
    }


}

export const learningLink = async (req: Request, res: Response) => {
    const link = Math.random().toString();
    // bcrypt.genSaltSync(12).toString();

    const checkLink = await prisma.learningLink.findFirstOrThrow({
        where: {
            link
        }
    });
    if (checkLink) {
        
    }
    const createLink = await prisma.learningLink.create({
        data: {
            link,
            userId: req?.user?.id!
        }
    });

}