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
exports.updateFile = exports.createFile = void 0;
const model_1 = require("../../model");
const utils_1 = require("../../utils");
const createFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let successItem = [];
    let failedItem = [];
    /**
    * validate first about size, mimetype, name
    */
    const validated = (0, utils_1.validateFiles)([utils_1.isSizeOK, utils_1.isMimeTypeOK])(file);
    const oldName = ((_a = file.originalFilename) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9_.-]/g, '_')) || '';
    const suffix = oldName.split('.').reverse()[0];
    const fileInstance = new model_1.LogWithDB(oldName, [], file);
    fileInstance.setDB(utils_1.db);
    if (validated.pass) {
        const result = yield fileInstance.createFileRecord(file.newFilename.concat(`.${suffix}`), file.size, file.mimetype || '', fileInstance.createFile, fileInstance, []);
        if (result instanceof Error) {
            failedItem = [...failedItem, { name: oldName, reason: [result.message] }];
        }
        else {
            successItem = [...successItem, Object.assign(Object.assign({}, result[0]), { original: oldName })];
        }
    }
    else {
        failedItem = [...failedItem, { name: oldName, reason: validated.reason }];
    }
    return { successItem, failedItem };
});
exports.createFile = createFile;
/**
*
*/
const updateFile = (oldName, newName) => __awaiter(void 0, void 0, void 0, function* () {
    const fileInstance = new model_1.LogWithDB(oldName);
    fileInstance.setDB(utils_1.db);
    const ifFileExisted = yield fileInstance.readFileRecord(oldName);
    if (ifFileExisted instanceof Error) {
        throw ifFileExisted;
    }
    else if (ifFileExisted.length === 0) {
        throw new Error(`404 this file not found`);
    }
    else {
        /**
        * validate the new name
        */
        const name = newName.replace(/[^a-zA-Z0-9_.-]/g, '_');
        const result = yield fileInstance.updateFileRecord(oldName, name, fileInstance.updateFile, fileInstance, [name]);
        if (result instanceof Error) {
            throw result;
        }
        else {
            return result[0];
        }
    }
});
exports.updateFile = updateFile;
