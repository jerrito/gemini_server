"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.learningLink = exports.addLearning = void 0;
const prisma_client_1 = require("../prisma_client");
const addLearning = async (req, res) => {
    const { title, data, url } = req.body;
    const user = await prisma_client_1.prisma.user.findFirstOrThrow({
        where: {
            id: req === null || req === void 0 ? void 0 : req.user.id
        }
    });
    const admin = await prisma_client_1.prisma.admin.findFirstOrThrow({
        where: {
            userId: user.id
        }
    });
    let learnData;
    const learnDataExist = await prisma_client_1.prisma.learning.findFirst({
        where: {
            adminId: admin.id
        }
    });
    if (!learnDataExist) {
        learnData = await prisma_client_1.prisma.learning.create({
            data: {
                adminId: admin.id,
            }
        });
        const learningResources = await prisma_client_1.prisma.learningResource.create({
            data: {
                data,
                title,
                learningId: learnData.id
            }
        });
        res.status(200).json({ learningResources });
    }
    else {
        const learningResources = await prisma_client_1.prisma.learningResource.create({
            data: {
                data,
                title,
                learningId: learnDataExist.id
            }
        });
        res.status(200).json({ learningResources });
    }
};
exports.addLearning = addLearning;
const learningLink = async (req, res) => {
    var _a;
    const link = Math.random().toString();
    // bcrypt.genSaltSync(12).toString();
    const checkLink = await prisma_client_1.prisma.learningLink.findFirstOrThrow({
        where: {
            link
        }
    });
    if (checkLink) {
    }
    const createLink = await prisma_client_1.prisma.learningLink.create({
        data: {
            link,
            userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id
        }
    });
};
exports.learningLink = learningLink;
