import fs from 'fs';
import formidable from 'formidable';
const config = require('config');
import path from 'path';

class Files {
  private name: string;
  private names: string[];
  private file: formidable.File | null;
  public constructor(name: string = '', names: string[] = [], file: formidable.File | null = null) {
    this.name = name;
    this.names = names;
    this.file = file;
  }
  public createFile() {
    try {
      if (this.file !== null) {
        const data = fs.readFileSync(this.file.filepath, { encoding: 'utf-8' });
        const originalFilename = this.file.originalFilename;
        const suffix = originalFilename?.split('.').reverse()[0];
        fs.writeFile(path.join(process.cwd(), `../../public/${this.name.concat(`.${suffix}`)}`), data, (err) => {
          if(err) throw new Error('503 failed to save')
        });
        return this.name.concat(`.${suffix}`);
      } else {
        return new Error(`400 empty files`);
      }
    } catch (err) {
      return new Error(`500 server inner mistake`);
    }
  }
}

export { Files };