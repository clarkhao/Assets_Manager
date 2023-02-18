import { RequestHandler } from "express";
import { logger, debugLogger } from '../../utils';
import { updateFile } from '../../service';
import type { Asset } from '../../model';

type Update = Asset & { oldName: string };

const updateFileHandler: RequestHandler = async (req, res, next) => {
  try {
    const newName = req.body.name;
    if (newName.trim() === '')
      throw new Error(`empty newName received`);
    const name = req.query.filename as string;
    if (name === undefined)
      throw new Error(`empty file name received`);
    const suffix = name.split('.').reverse()[0];
    const update = await updateFile(name, newName);
    res.status(200).json({ msg: 'OK', update: { ...update, name: newName.concat(`.${suffix}`), original: name } });
  } catch (err) {
    next(err);
  }
}

export { updateFileHandler };