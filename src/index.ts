import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { routerApiDoc } from './router';
import {LoggerRouter} from './middleware';
require('dotenv').config();
const config = require('config');

const app: Express = express();
const port = config.get('server.port');
//bodyParser用于解析请求体，即req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(LoggerRouter);
app.use(routerApiDoc);

app.listen(port, () => {
	console.log(`
        NODE_ENV is ${process.env.NODE_ENV}
        ⚡️[server]: Server is running at ${config.get('server.host')}:${port}
    `);
});