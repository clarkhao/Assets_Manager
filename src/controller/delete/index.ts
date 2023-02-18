import { RequestHandler } from "express";
import { logger, debugLogger } from '../../utils';
import { deleteFile } from '../../service';

const deleteFileHandler: RequestHandler = async (req, res, next) => {
  try {
    const arr = req.query.filename as string;
    const fileList = arr.split(',').map(v => v.trim());
    let success: Array<string> = [];
    let failed: Array<string> = [];
    for (const fname of fileList) {
      const deleted = await deleteFile(fname) as Array<{ name: string }> | Error;
      if (deleted instanceof Error) {
        failed = [...failed, fname];
      } else {
        success = [...success, deleted[0].name];
      }
    }
    if (success.length === 0) {
      throw new Error("500 all failed to delete");
    }
    res.json({ msg: 'ok', success, failed });
  } catch (err) {
    next(err);
  }
}

export { deleteFileHandler };