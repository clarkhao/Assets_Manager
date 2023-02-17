import { RequestHandler } from "express";
import { logger } from '../utils';

const loggerHandler: RequestHandler = async function(req, res, next) {
  res.on('finish', () => {
    if (res.statusCode < 400) {
      logger.info({
        method: req.method,
        url: req.url,
        body: req.body,
        status: res.statusCode,
        resHeaders: res.getHeaders(),
      })
    } else {
      logger.error({
        method: req.method,
        url: req.url,
        body: req.body,
        status: res.statusCode,
        resHeaders: res.getHeaders(),
      })
    }
  })
  next();
}

export { loggerHandler };