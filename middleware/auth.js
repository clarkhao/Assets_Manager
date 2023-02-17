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
exports.authHandler = void 0;
const utils_1 = require("../utils");
const authHandler = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        utils_1.debugLogger.debug(`from auth middleware: ${authHeader}`);
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            (0, utils_1.validateToken)(token).then(res => {
                if (res instanceof Error)
                    next(res);
                else
                    next();
            });
        }
        else {
            next(new Error(`401 not authorized`));
        }
    });
};
exports.authHandler = authHandler;
