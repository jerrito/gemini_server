"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLearning = void 0;
const prisma_client_1 = require("../prisma_client");
const addLearning = async (req, res) => {
    const { title, data, url } = req.body;
    const learnData = await prisma_client_1.prisma.learning.create({
        data: {
            title,
            data,
            url,
        }
    });
    res.status(200).json({ learnData });
};
exports.addLearning = addLearning;
