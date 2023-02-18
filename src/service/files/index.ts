import { LogWithDB } from '../../model';
import type { Asset } from '../../model';
import formidable from 'formidable';
import { db, debugLogger, isSizeOK, isMimeTypeOK, validateFiles } from '../../utils';

const createFile = async (file: formidable.File) => {
  let successItem: Array<Asset & { original: string }> = [];
  let failedItem: Array<{ name: string, reason: string[] }> = [];
  /** 
  * validate first about size, mimetype, name
  */
  const validated = validateFiles([isSizeOK, isMimeTypeOK])(file);
  const oldName = file.originalFilename?.replace(/[^a-zA-Z0-9_.-]/g, '_') || '';
  const suffix = oldName.split('.').reverse()[0];
  const fileInstance = new LogWithDB(oldName, [], file);
  fileInstance.setDB(db);
  if (validated.pass) {
    const result = await fileInstance.createFileRecord(file.newFilename.concat(`.${suffix}`), file.size, file.mimetype || '', fileInstance.createFile, fileInstance, []) as Asset[] | Error;
    if (result instanceof Error) {
      failedItem = [...failedItem, { name: oldName, reason: [result.message] }];
    } else {
      successItem = [...successItem, { ...result[0], original: oldName }];
    }
  } else {
    failedItem = [...failedItem, { name: oldName, reason: validated.reason }];
  }
  return { successItem, failedItem };
}
/** 
*
*/
const updateFile = async (oldName: string, newName: string) => {
  const fileInstance = new LogWithDB(oldName);
  fileInstance.setDB(db);
  const ifFileExisted = await fileInstance.readFileRecord(oldName) as { num: number }[] | Error;
  if (ifFileExisted instanceof Error) {
    throw ifFileExisted;
  } else if (ifFileExisted.length === 0) {
    throw new Error(`404 this file not found`)
  } else {
    /** 
    * validate the new name
    */
    const name = newName.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const result = await fileInstance.updateFileRecord(oldName, name, fileInstance.updateFile, fileInstance, [name]) as Asset[] | Error;
    if (result instanceof Error) {
      throw result;
    } else {
      return result[0];
    }
  }

}
export { createFile, updateFile };