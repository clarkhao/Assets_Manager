import express, { RequestHandler } from "express";
import {logger} from '../utils';

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

export {loggerHandler};