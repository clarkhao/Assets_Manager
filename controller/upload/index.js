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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadHandler = void 0;
const formidable_1 = __importDefault(require("formidable"));
const utils_1 = require("../../utils");
const model_1 = require("../../model");
const uploadHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = (0, formidable_1.default)({ multiples: true });
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (!err) {
            let success = [];
            let failed = [];
            const multi = Array.isArray(files.filename);
            try {
                if (multi) {
                    const fileList = files.filename;
                    for (const file of fileList) {
                        const fileSave = new model_1.Files(file.newFilename, [], file);
                        const result = fileSave.createFile();
                        if (result instanceof Error) {
                            failed = [...failed, file.originalFilename];
                        }
                        else {
                            success = [...success, { now: file.newFilename, original: file.originalFilename }];
                        }
                    }
                }
                else {
                    const file = files.filename;
                    const fileSave = new model_1.Files(file.newFilename, [], file);
                    const result = fileSave.createFile();
                    if (result instanceof Error) {
                        failed = [...failed, file.originalFilename];
                    }
                    else {
                        success = [...success, { now: file.newFilename, original: file.originalFilename }];
                    }
                }
                res.status(201).json({ msg: 'ok', multi, success, failed });
            }
            catch (error) {
                utils_1.debugLogger.debug(`error from upload controller: ${error}`);
                next(error);
            }
        }
        else {
            next(err);
            return;
        }
    }));
});
exports.uploadHandler = uploadHandler;
