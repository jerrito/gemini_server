"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.getDataById = exports.listData = exports.createData = void 0;
const bad_request_1 = require("../exceptions/bad_request");
const root_1 = require("../exceptions/root");
const prisma_client_1 = require("../prisma_client");
const createData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { info, title, dataImage } = req.body;
    const data = yield prisma_client_1.prisma.userData.create({
        data: {
            title: title,
            dataImage: dataImage,
            userId: req.user.id,
            data: info
        }
    });
    res.status(200).json(data);
});
exports.createData = createData;
const listData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield prisma_client_1.prisma.userData.count();
    const data = yield prisma_client_1.prisma.userData.findMany({
        take: 10,
        where: {
            userId: req.user.id,
        }
    });
    if (data.length == 0) {
        throw new bad_request_1.BadRequest("No data found", root_1.ErrorCode.NOT_FOUND);
    }
    res.status(200).json(data);
});
exports.listData = listData;
const getDataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_client_1.prisma.userData.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        });
        res.status(200).json({ data });
    }
    catch (e) {
        throw new bad_request_1.BadRequest("Data not found", root_1.ErrorCode.BAD_REQUEST);
    }
});
exports.getDataById = getDataById;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_client_1.prisma.userData.delete({
            where: {
                id: +req.params.id
            }
        });
        res.status(200).json({ "success": true });
    }
    catch (e) {
        throw new bad_request_1.BadRequest("Error deleting data", root_1.ErrorCode.BAD_REQUEST);
    }
});
exports.deleteData = deleteData;
