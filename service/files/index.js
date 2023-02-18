"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const model_1 = require("../../model");
const utils_1 = require("../../utils");
const createFile = (file) => {
    var _a, _b, _c;
    let successItem = [];
    let failedItem = [];
    /**
    * validate first about size, mimetype, name
    */
    const validated = (0, utils_1.validateFiles)([utils_1.isSizeOK, utils_1.isMimeTypeOK])(file);
    if (validated.pass) {
        const fileSave = new model_1.Files(file.newFilename, [], file);
        const result = fileSave.createFile();
        if (result instanceof Error) {
            failedItem = [...failedItem, { name: (_a = file.originalFilename) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9_.-]/g, '_'), reason: [result.message] }];
        }
        else {
            successItem = [...successItem, { now: file.newFilename, original: (_b = file.originalFilename) === null || _b === void 0 ? void 0 : _b.replace(/[^a-zA-Z0-9_.-]/g, '_') }];
        }
    }
    else {
        failedItem = [...failedItem, { name: (_c = file.originalFilename) === null || _c === void 0 ? void 0 : _c.replace(/[^a-zA-Z0-9_.-]/g, '_'), reason: validated.reason }];
    }
    return { successItem, failedItem };
};
exports.createFile = createFile;
