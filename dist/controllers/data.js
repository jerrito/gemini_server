"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMany = exports.deleteData = exports.getDataById = exports.listData = exports.createData = void 0;
const bad_request_1 = require("../exceptions/bad_request");
const root_1 = require("../exceptions/root");
const prisma_client_1 = require("../prisma_client");
const data_1 = require("../validation/data");
// create Data 
const createData = async (req, res, next) => {
    const validatedData = data_1.dataSchema.parse(req.body);
    console.log(req.user.id);
    const dataGenerated = await prisma_client_1.prisma.dataGenerated.create({
        data: {
            title: validatedData.title,
            dataImage: validatedData.dataImage,
            hasImage: validatedData.hasImage,
            userId: req.user.id,
            data: validatedData.data
        }
    });
    res.status(200).json(dataGenerated);
};
exports.createData = createData;
// list Data By Id
const listData = async (req, res, next) => {
    const count = await prisma_client_1.prisma.dataGenerated.count();
    const data = await prisma_client_1.prisma.dataGenerated.findMany({
        take: 10,
        orderBy: {
            id: 'desc'
        },
        where: {
            userId: req.user.id,
        }
    });
    if (data.length == 0) {
        throw new bad_request_1.BadRequest("No data found", root_1.ErrorCode.NOT_FOUND);
    }
    res.status(200).json(data);
};
exports.listData = listData;
// get Data By Id
const getDataById = async (req, res, next) => {
    try {
        const data = await prisma_client_1.prisma.dataGenerated.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        });
        res.status(200).json({ data });
    }
    catch (e) {
        throw new bad_request_1.BadRequest("Data not found", root_1.ErrorCode.BAD_REQUEST);
    }
};
exports.getDataById = getDataById;
// Delete Data
const deleteData = async (req, res, next) => {
    try {
        await prisma_client_1.prisma.dataGenerated.delete({
            where: {
                id: +req.params.id
            }
        });
        res.status(200).json({ "success": true });
    }
    catch (e) {
        throw new bad_request_1.BadRequest("Error deleting data", root_1.ErrorCode.BAD_REQUEST);
    }
};
exports.deleteData = deleteData;
// Delete List Of Data
const deleteMany = async (req, res) => {
    var _a;
    const { list } = req.body;
    const validationSchema = data_1.listDataSchema.parse(req.body);
    console.log(list);
    for (let i = 0; i < list.length; i++) {
        await prisma_client_1.prisma.dataGenerated.delete({
            where: {
                id: validationSchema.list[i],
                userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
            }
        });
    }
    return res.status(200).json({ "success": true });
};
exports.deleteMany = deleteMany;
