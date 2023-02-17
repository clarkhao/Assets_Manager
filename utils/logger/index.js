"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
// Create logger instance
const logger = (0, winston_1.createLogger)({
    level: 'debug',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
    transports: [
        // Write logs to console
        new winston_1.transports.Console({
            level: 'debug',
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
        }),
        // Write all requests and responses to a single file
        new winston_1.transports.File({
            level: 'info',
            filename: path_1.default.join(__dirname, '../../logger/requests.log'),
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
        }),
        // Write error messages to a separate file
        new winston_1.transports.File({
            level: 'error',
            filename: path_1.default.join(__dirname, '../../logger/error.log'),
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
        })
    ]
});
exports.logger = logger;
