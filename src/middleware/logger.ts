import express, { RequestHandler } from "express";
import {logger} from '../utils';

//观察所有请求来源
const LoggerRouter = express.Router();

const loggerHandler: RequestHandler = async function(req, res, next) {
  res.on('finish', () => {
    logger.info({
      method: req.method,
      url: req.url,
      body: req.body,
      status: res.statusCode,
      resHeaders: res.getHeaders(),
    })
  })
  next();
}
LoggerRouter.use(loggerHandler);

export {LoggerRouter};