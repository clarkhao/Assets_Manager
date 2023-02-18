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
exports.getListHandler = void 0;
const utils_1 = require("../../utils");
const model_1 = require("../../model");
const config = require('config');
const getListHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageIndex = parseInt(req.query.index);
        const file = new model_1.LogWithDB();
        file.setDB(utils_1.db);
        const limit = config.get('pagination.limit');
        const result = yield file.readFiles(limit, limit * (pageIndex - 1));
        if (result instanceof Error) {
            throw result;
        }
        res.status(200).json({ msg: 'OK', files: result });
    }
    catch (err) {
        next(err);
    }
});
exports.getListHandler = getListHandler;
