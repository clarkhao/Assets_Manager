import { RequestHandler } from "express";
import formidable from 'formidable';
import { logger, debugLogger } from '../../utils';
import { createFile } from '../../service';
import type { Asset } from '../../model';

const uploadHandler: RequestHandler = async (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    debugLogger.debug(`from controller upload fields: ${JSON.stringify(fields)}`);
    debugLogger.debug(`from controller upload files: ${JSON.stringify(files)}`);
    if (!err) {
      let success: Array<Asset & { original: string }> = [];
      let failed: Array<{ name: string, reason: string[] }> = [];
      const multi = Array.isArray(files.filename);
      try {
        if (multi) {
          const fileList = files.filename as formidable.File[];
          for (const file of fileList) {
            const { successItem, failedItem } = await createFile(file);
            success = [...success, ...successItem];
            failed = [...failed, ...failedItem]
          }
        } else {
          const file = files.filename as formidable.File;
          const { successItem, failedItem } = await createFile(file);
          success = successItem;
          failed = failedItem;
        }
        res.status(201).json({ msg: 'ok', multi, success, failed });
      } catch (error) {
        debugLogger.debug(`error from upload controller: ${error}`);
        next(error);
      }
    } else {
      next(err);
      return;
    }
  })
}

export { uploadHandler };