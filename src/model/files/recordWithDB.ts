import { PGConnect } from '../../utils';
import type { Asset } from './type';
import { Files } from './index';
type Constructor = new (...args: any[]) => {};

// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:

function ScaleLogWithDB<TBase extends Constructor>(Base: TBase) {
  return class LogWithDB extends Base {
    // Mixins may not declare private/protected properties
    // however, you can use ES2020 private fields
    _database: PGConnect | null = null;
    setDB(database: PGConnect) {
      this._database = database;
    }
    get database(): PGConnect | null {
      return this._database;
    }
    _id: number = 0;
    setId(id: number) {
      this._id = id;
    }
    get id(): number {
      return this._id;
    }
    createFileRecord(name: string, size: number, mime: string, handler: Function, object: Object, args: unknown[]) {
      return this._database && this._database.connect<Asset>(`
        insert into deta.asset ("name", "size", "mime")
        values ($1, $2, $3)
        returning *;
      `, { isReturning: true, isTransaction: true }, [name, size, mime], handler, object, args);
    }
    readFileRecord(name: string) {
      return this._database && this._database.connect<{ num: number }>(`
        select count("name") as num from deta.asset 
        where "name"=$1;
      `, { isReturning: false, isTransaction: false }, [name])
    }
    updateFileRecord(oldName: string, newName: string, handler: Function, object: Object, args: unknown[]) {
      return this._database && this._database.connect<Asset>(`
        with temp_table as (
          select id from deta.asset where "name"=$1
        )
        update deta.asset
        set "name"=$2
        where "id" in (select id from temp_table)
        returning *;
      `, { isReturning: true, isTransaction: true }, [oldName, newName], handler, object, args);
    }
  }
}

export const LogWithDB = ScaleLogWithDB(Files);