"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = require("./router");
const middleware_1 = require("./middleware");
require('dotenv').config();
const config = require('config');
const app = (0, express_1.default)();
const port = config.get('server.port');
//bodyParser用于解析请求体，即req.body
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(middleware_1.loggerHandler);
app.use(router_1.routerApiDoc);
app.use(middleware_1.errorHandler);
app.listen(port, () => {
    console.log(`
        NODE_ENV is ${process.env.NODE_ENV}
        ⚡️[server]: Server is running at ${config.get('server.host')}:${port}
    `);
});
