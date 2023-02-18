"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogWithDB = void 0;
const index_1 = require("./index");
// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:
function ScaleLogWithDB(Base) {
    return class LogWithDB extends Base {
        constructor() {
            super(...arguments);
            // Mixins may not declare private/protected properties
            // however, you can use ES2020 private fields
            this._database = null;
            this._id = 0;
        }
        setDB(database) {
            this._database = database;
        }
        get database() {
            return this._database;
        }
        setId(id) {
            this._id = id;
        }
        get id() {
            return this._id;
        }
        createFileRecord(name, size, mime, handler, object, args) {
            return this._database && this._database.connect(`
        insert into deta.asset ("name", "size", "mime")
        values ($1, $2, $3)
        returning *;
      `, { isReturning: true, isTransaction: true }, [name, size, mime], handler, object, args);
        }
        readFileRecord(name) {
            return this._database && this._database.connect(`
        select count("name") as num from deta.asset 
        where "name"=$1;
      `, { isReturning: false, isTransaction: false }, [name]);
        }
        updateFileRecord(oldName, newName, handler, object, args) {
            return this._database && this._database.connect(`
        with temp_table as (
          select id from deta.asset where "name"=$1
        )
        update deta.asset
        set "name"=$2
        where "id" in (select id from temp_table)
        returning *;
      `, { isReturning: true, isTransaction: true }, [oldName, newName], handler, object, args);
        }
    };
}
exports.LogWithDB = ScaleLogWithDB(index_1.Files);
