import { RequestHandler } from "express";
import formidable from 'formidable';
import {logger, debugLogger} from '../../utils';
import {Files} from '../../model';

const uploadHandler: RequestHandler = async (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if(!err) {
      let success: Array<{now: string, original: string}> = [];
      let failed: Array<string> = [];
      const multi = Array.isArray(files.filename);
      try {
          if(multi) {
            const fileList = files.filename as formidable.File[];
            for(const file of fileList) {
              const fileSave = new Files(file.newFilename, [], file);
              const result = fileSave.createFile();
              if(result instanceof Error) {
                failed = [...failed, file.originalFilename as string];
              } else {
                success = [...success, {now: file.newFilename as string, original: file.originalFilename as string}];
              }
            }
          } else {
            const file = files.filename as formidable.File;
            const fileSave = new Files(file.newFilename, [], file);
            const result = fileSave.createFile();
            if(result instanceof Error) {
              failed = [...failed, file.originalFilename as string];
            } else {
              success = [...success, {now: file.newFilename as string, original: file.originalFilename as string}];
            }
          }
          
          res.status(201).json({msg:'ok',multi, success, failed});
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

export {uploadHandler};