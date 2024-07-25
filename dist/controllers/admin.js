"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSignup = void 0;
const client_1 = require("@prisma/client");
const prisma_client_1 = require("../prisma_client");
const AdminSignup = async (req, res) => {
    const { subject, role } = req.body;
    const Admin = await prisma_client_1.prisma.admin.create({
        data: {
            userId: req === null || req === void 0 ? void 0 : req.user.id,
            subject,
            isApproved: true
        },
    });
    const updateRole = await prisma_client_1.prisma.user.update({
        where: {
            id: req === null || req === void 0 ? void 0 : req.user.id
        },
        data: {
            role: client_1.Role.Admin
        }
    });
    res.status(200).json({ Admin, updateRole });
};
exports.AdminSignup = AdminSignup;
