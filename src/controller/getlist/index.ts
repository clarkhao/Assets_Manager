import { RequestHandler } from "express";
import { db, logger, debugLogger } from '../../utils';
import type { Asset } from '../../model';
import { LogWithDB } from '../../model';
const config = require('config');

const getListHandler: RequestHandler = async (req, res, next) => {
  try {
    const pageIndex = parseInt(req.query.index as string);
    const file = new LogWithDB();
    file.setDB(db);
    const limit = config.get('pagination.limit') as number;
    const result = await file.readFiles(limit, limit * (pageIndex - 1)) as Asset[] | Error;
    if (result instanceof Error) {
      throw result;
    }
    res.status(200).json({ msg: 'OK', files: result });
  } catch (err) {
    next(err);
  }
}

export { getListHandler };