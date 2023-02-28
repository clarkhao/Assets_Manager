"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../../utils");
const util_1 = require("util");
class Files {
    constructor(name = '', names = [], file) {
        this.name = name;
        this.names = names;
        this.file = file;
    }
    createFile() {
        var _a, _b, _c;
        try {
            const originalFilepath = (_a = this.file) === null || _a === void 0 ? void 0 : _a.filepath;
            const originalFilename = (_b = this.file) === null || _b === void 0 ? void 0 : _b.originalFilename;
            const suffix = originalFilename === null || originalFilename === void 0 ? void 0 : originalFilename.split('.').reverse()[0];
            const readStream = fs_1.default.createReadStream(originalFilepath);
            const writeStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, `../../public/${(_c = this.file) === null || _c === void 0 ? void 0 : _c.newFilename.concat(`.${suffix}`)}`));
            readStream.pipe(writeStream);
            return this.name.concat(`.${suffix}`);
        }
        catch (err) {
            throw new Error(`500 failed to save`);
        }
    }
    updateFile(newName) {
        const promiseRename = (0, util_1.promisify)(fs_1.default.rename);
        promiseRename(path_1.default.join(__dirname, `../../public/${this.name}`), path_1.default.join(__dirname, `../../public/${newName}`))
            .catch(err => {
            utils_1.debugLogger.debug(err.message);
            throw new Error(`500 inner server mistake`);
        });
    }
    deleteFile() {
        const promiseUnlink = (0, util_1.promisify)(fs_1.default.unlink);
        promiseUnlink(path_1.default.join(__dirname, `../../public/${this.name}`))
            .catch(err => {
            utils_1.debugLogger.debug(err.message);
            throw new Error(`500 inner server mistake`);
        });
    }
}
exports.Files = Files;
