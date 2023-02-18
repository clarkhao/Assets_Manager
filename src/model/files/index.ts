import fs from 'fs';
import formidable from 'formidable';
import path from 'path';
import { debugLogger } from '../../utils';

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
      if (this.file !== null && this.file !== undefined) {
        const data = fs.readFileSync(this.file.filepath);
        const originalFilename = this.file.originalFilename;
        const suffix = originalFilename?.split('.').reverse()[0];
        fs.writeFileSync(path.join(__dirname, `../../public/${this.file.newFilename.concat(`.${suffix}`)}`), data);
        return this.name.concat(`.${suffix}`);
      } else {
        throw new Error(`400 empty files`);
      }
    } catch (err) {
      throw new Error(`500 failed to save`);
    }
  }
  public updateFile(newName: string) {
    fs.rename(path.join(__dirname, `../../public/${this.name}`),
      path.join(__dirname, `../../public/${newName}`),
      (err) => {
        if (err) {
          throw err;
        }
      })
  }
  public deleteFile() {
    try {
      fs.unlinkSync(path.join(__dirname, `../../public/${this.name}`));
    } catch (err) {
      throw err;
    }
  }
}

export { Files };