"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSignup = void 0;
const prisma_client_1 = require("prisma_client");
const AdminSignup = async (req, res) => {
    const { userName, email, password, subject, role } = req.body;
    const Admin = await prisma_client_1.prisma.user.create({
        data: {
            userName, email, password,
        },
    });
    res.status(200).json({ Admin });
};
exports.AdminSignup = AdminSignup;
