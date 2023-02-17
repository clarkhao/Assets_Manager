"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugLogger = exports.logger = void 0;
const winston_1 = require("winston");
const DailyRotateFile = require('winston-daily-rotate-file');
const path_1 = __importDefault(require("path"));
// Create logger instance
const logger = (0, winston_1.createLogger)({
    transports: [
        // write log into file with rotating 7 days
        new DailyRotateFile({
            level: 'info',
            filename: path_1.default.join(__dirname, '../../logger/request-%DATE%.log'),
            datePattern: 'YYYY-WW',
            zippedArchive: true,
            maxSize: '10m',
            maxFiles: '7d',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(info => {
                return `${info.timestamp} [${info.level}]: ${JSON.stringify(info.message)}`;
            }))
        }),
        new DailyRotateFile({
            level: 'error',
            filename: path_1.default.join(__dirname, '../../logger/error-%DATE%.log'),
            datePattern: 'YYYY-WW',
            zippedArchive: true,
            maxSize: '10m',
            maxFiles: '7d',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(info => {
                return `${info.timestamp} [${info.level}]: ${JSON.stringify(info.message)}`;
            }))
        }),
    ]
});
exports.logger = logger;
const debugLogger = (0, winston_1.createLogger)({
    transports: [
        // Write debug logs to console
        new winston_1.transports.Console({
            level: 'debug',
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
        })
    ]
});
exports.debugLogger = debugLogger;
