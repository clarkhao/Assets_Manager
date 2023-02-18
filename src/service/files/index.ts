import { Files } from '../../model';
import formidable from 'formidable';
import { isSizeOK, isMimeTypeOK, validateFiles } from '../../utils';

const createFile = (file: formidable.File) => {
  let successItem: Array<{ now: string, original: string }> = [];
  let failedItem: Array<{ name: string, reason: string[] }> = [];
  /** 
  * validate first about size, mimetype, name
  */
  const validated = validateFiles([isSizeOK, isMimeTypeOK])(file);
  if (validated.pass) {
    const fileSave = new Files(file.newFilename, [], file);
    const result = fileSave.createFile();
    if (result instanceof Error) {
      failedItem = [...failedItem, { name: file.originalFilename?.replace(/[^a-zA-Z0-9_.-]/g, '_') as string, reason: [result.message] }];
    } else {
      successItem = [...successItem, { now: file.newFilename as string, original: file.originalFilename?.replace(/[^a-zA-Z0-9_.-]/g, '_') as string }];
    }
  } else {
    failedItem = [...failedItem, { name: file.originalFilename?.replace(/[^a-zA-Z0-9_.-]/g, '_') as string, reason: validated.reason }];
  }
  return { successItem, failedItem };
}

export { createFile };