"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Files {
    constructor(name = '', names = [], file) {
        this.name = name;
        this.names = names;
        this.file = file;
    }
    createFile() {
        try {
            if (this.file !== null && this.file !== undefined) {
                const data = fs_1.default.readFileSync(this.file.filepath);
                const originalFilename = this.file.originalFilename;
                const suffix = originalFilename === null || originalFilename === void 0 ? void 0 : originalFilename.split('.').reverse()[0];
                fs_1.default.writeFileSync(path_1.default.join(__dirname, `../../public/${this.file.newFilename.concat(`.${suffix}`)}`), data);
                return this.name.concat(`.${suffix}`);
            }
            else {
                throw new Error(`400 empty files`);
            }
        }
        catch (err) {
            throw new Error(`500 failed to save`);
        }
    }
    updateFile(newName) {
        fs_1.default.rename(path_1.default.join(__dirname, `../../public/${this.name}`), path_1.default.join(__dirname, `../../public/${newName}`), (err) => {
            if (err) {
                throw err;
            }
        });
    }
    deleteFile() {
        try {
            fs_1.default.unlinkSync(path_1.default.join(__dirname, `../../public/${this.name}`));
        }
        catch (err) {
            throw err;
        }
    }
}
exports.Files = Files;
