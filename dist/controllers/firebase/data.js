"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListFirestoreData = exports.deleteFirestoreData = exports.listFirestoreData = exports.getFirestoreDataById = exports.createFireStoreData = void 0;
const data_1 = require("../../validation/data");
const index_1 = require("../../index");
const bad_request_1 = require("../../exceptions/bad_request");
const root_1 = require("../../exceptions/root");
const cloudinary_1 = __importDefault(require("cloudinary"));
const createFireStoreData = async (req, res, next) => {
    const validatedData = data_1.dataSchema.parse(req.body);
    let url = "";
    if (validatedData.hasImage) {
        const da = new Uint8Array(validatedData.dataImage);
        try {
            const uploadResult = await new Promise((resolve) => {
                cloudinary_1.default.v2.uploader.upload_stream((error, uploadResult) => {
                    url = uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url;
                    console.log(url);
                    console.log(error);
                    return resolve(uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url);
                }).end(da);
            });
        }
        catch (e) {
            throw new bad_request_1.BadRequest(e.toString(), root_1.ErrorCode.BAD_REQUEST);
        }
    }
    const da = await (0, index_1.data)(req)
        .add({
        "title": validatedData.title,
        "data": validatedData.data,
        "hasImage": validatedData.hasImage,
        "dataImage": url,
        "dateTime": Date.now()
    });
    res.status(200).json((await da.get()).data());
};
exports.createFireStoreData = createFireStoreData;
const getFirestoreDataById = async (req, res) => {
    const id = req.params.id.toString();
    console.log(id);
    try {
        const da = await (0, index_1.data)(req)
            .doc(id)
            .get();
        res.status(200).json(da.data());
    }
    catch (e) {
        throw new bad_request_1.BadRequest("Document id cannot be found", root_1.ErrorCode.NOT_FOUND);
    }
};
exports.getFirestoreDataById = getFirestoreDataById;
const listFirestoreData = async (req, res) => {
    let all = [];
    let ids = [];
    const da = await (0, index_1.data)(req)
        .get();
    da.forEach(async (e) => {
        all.push(e.data());
        ids.push(e.id);
    });
    res.status(200).json({ "list": all, "ids": ids });
};
exports.listFirestoreData = listFirestoreData;
const deleteFirestoreData = async (req, res) => {
    var _a;
    const id = (_a = req.params.id) === null || _a === void 0 ? void 0 : _a.toString();
    try {
        const da = await (0, index_1.data)(req)
            .doc(id)
            .delete({
            exists: true
        });
    }
    catch (e) {
        throw new bad_request_1.BadRequest(e.toString(), root_1.ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ "success": true });
};
exports.deleteFirestoreData = deleteFirestoreData;
const deleteListFirestoreData = async (req, res) => {
    const { list } = req.body;
    const batchDelete = index_1.firebaseAdmin.firestore().batch();
    for (let i = 0; i < list.length; i++) {
        batchDelete.delete((0, index_1.data)(req).doc(list[i]));
    }
    await batchDelete.commit();
    res.status(200).json({ "success": true });
};
exports.deleteListFirestoreData = deleteListFirestoreData;
