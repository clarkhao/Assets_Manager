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
exports.updateFileHandler = void 0;
const service_1 = require("../../service");
const updateFileHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newName = req.body.name;
        if (newName.trim() === '')
            throw new Error(`empty newName received`);
        const name = req.query.filename;
        if (name === undefined)
            throw new Error(`empty file name received`);
        const suffix = name.split('.').reverse()[0];
        const update = yield (0, service_1.updateFile)(name, newName);
        res.status(200).json({ msg: 'OK', update: Object.assign(Object.assign({}, update), { name: newName.concat(`.${suffix}`), original: name }) });
    }
    catch (err) {
        next(err);
    }
});
exports.updateFileHandler = updateFileHandler;
