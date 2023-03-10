"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../logger");
const validateToken = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env['JWT_KEY']);
        logger_1.debugLogger.debug(`from utils/jwt payload: ${JSON.stringify(payload)}`);
        return Promise.resolve(payload);
    }
    catch (err) {
        logger_1.debugLogger.debug(`from utils/jwt error: ${err}`);
        return Promise.resolve(new Error(`403 ${err}`));
    }
};
exports.validateToken = validateToken;
