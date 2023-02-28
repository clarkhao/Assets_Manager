import fs from 'fs';
import formidable from 'formidable';
import path from 'path';
import { debugLogger } from '../../utils';
import { promisify } from 'util';

class Files {
  private name: string;
  private names?: string[];
  private file?: formidable.File;
  public constructor(name: string = '', names: string[] = [], file?: formidable.File) {
    this.name = name;
    this.names = names;
    this.file = file;
  }
  public createFile() {
    try {
      const originalFilepath = this.file?.filepath;
      const originalFilename = this.file?.originalFilename;
      const suffix = originalFilename?.split('.').reverse()[0];
      const readStream = fs.createReadStream(originalFilepath as string);
      const writeStream = fs.createWriteStream(path.join(__dirname, `../../public/${this.file?.newFilename.concat(`.${suffix}`)}`));
      readStream.pipe(writeStream);
      return this.name.concat(`.${suffix}`);
    } catch (err) {
      throw new Error(`500 failed to save`);
    }
  }
  public updateFile(newName: string) {
    const promiseRename = promisify(fs.rename);
    promiseRename(path.join(__dirname, `../../public/${this.name}`),
      path.join(__dirname, `../../public/${newName}`))
      .catch(err => {
        debugLogger.debug(err.message);
        throw new Error(`500 inner server mistake`);
      })
  }
  public deleteFile() {
    const promiseUnlink = promisify(fs.unlink);
    promiseUnlink(path.join(__dirname, `../../public/${this.name}`))
      .catch(err => {
        debugLogger.debug(err.message);
        throw new Error(`500 inner server mistake`);
      })
  }
}

export { Files };