import fs from 'fs';
import formidable from 'formidable';
const config = require('config');

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
        
      }
    } catch (err) {

    }
  }
}

export { Files };