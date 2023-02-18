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
exports.deleteFileHandler = void 0;
const service_1 = require("../../service");
const deleteFileHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arr = req.query.filename;
        const fileList = arr.split(',').map(v => v.trim());
        let success = [];
        let failed = [];
        for (const fname of fileList) {
            const deleted = yield (0, service_1.deleteFile)(fname);
            if (deleted instanceof Error) {
                failed = [...failed, fname];
            }
            else {
                success = [...success, deleted[0].name];
            }
        }
        if (success.length === 0) {
            throw new Error("500 all failed to delete");
        }
        res.json({ msg: 'ok', success, failed });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteFileHandler = deleteFileHandler;
