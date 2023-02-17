"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const fs_1 = __importDefault(require("fs"));
const config = require('config');
const path_1 = __importDefault(require("path"));
class Files {
    constructor(name = '', names = [], file = null) {
        this.name = name;
        this.names = names;
        this.file = file;
    }
    createFile() {
        try {
            if (this.file !== null) {
                const data = fs_1.default.readFileSync(this.file.filepath, { encoding: 'utf-8' });
                const originalFilename = this.file.originalFilename;
                const suffix = originalFilename === null || originalFilename === void 0 ? void 0 : originalFilename.split('.').reverse()[0];
                fs_1.default.writeFile(path_1.default.join(process.cwd(), `../../public/${this.name.concat(`.${suffix}`)}`), data, (err) => {
                    if (err)
                        throw new Error('503 failed to save');
                });
                return this.name.concat(`.${suffix}`);
            }
            else {
                return new Error(`400 empty files`);
            }
        }
        catch (err) {
            return new Error(`500 server inner mistake`);
        }
    }
}
exports.Files = Files;
