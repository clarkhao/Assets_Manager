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
exports.errorHandler = void 0;
const utils_1 = require("../utils");
//错误处理
const errorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    utils_1.logger.error(err.stack);
    try {
        const [numStr, ...messageArray] = err.message.split(' ');
        const num = parseInt(numStr);
        const statusCode = Number.isNaN(num) ? 400 : num;
        const message = Number.isNaN(num) ? err.message : messageArray.join(' ');
        res.status(statusCode).json({ error: message });
    }
    catch (error) {
        utils_1.logger.error(`from errorHandler: ${error}`);
        res.status(500).json({ msg: `${error}` });
    }
});
exports.errorHandler = errorHandler;
