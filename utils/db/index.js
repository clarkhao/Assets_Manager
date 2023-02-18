"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PGConnect = exports.db = void 0;
const pg_1 = require("pg");
const config = require('config');
const logger_1 = require("../logger");
class PGConnect {
    constructor(db) {
        this.credentials = {
            user: process.env[config.get('db.user')] || '',
            host: process.env[config.get('db.host')] || '',
            database: db,
            password: process.env[config.get('db.pwd')] || '',
            port: config.get('db.port'),
            ssl: true
            //connectionTimeoutMillis: 2000
        };
        this.pool = new pg_1.Pool(this.credentials);
    }
    /**
     * 封装了普通查询和事务查询
     * @param text sql clauses
     * @param values values in sql clauses, indicated by $1, $2 ...
     * @param options options.isReturning=true, 函数返回boolean,
     *                options.isReturing=false时，insert,update和delete最后使用returning语句, 函数返回T[]
     *                options.isTransaction
     * @param handler optional handler occured in a transaction situation, not async function
     * @param args the arguments binded with handler
     * @returns Promise<boolean | T[] | Error>
     */
    connect(text, options, values, handler, object, args) {
        return this.pool.connect().then((client) => __awaiter(this, void 0, void 0, function* () {
            try {
                (options === null || options === void 0 ? void 0 : options.isTransaction) && (yield client.query('BEGIN'));
                const result = yield client.query(text, values);
                (options === null || options === void 0 ? void 0 : options.isTransaction) && (handler === null || handler === void 0 ? void 0 : handler.apply(object, args));
                (options === null || options === void 0 ? void 0 : options.isTransaction) && (yield client.query('COMMIT'));
                if ((result.command === 'INSERT' || result.command === 'UPDATE' || result.command === 'DELETE') && !(options === null || options === void 0 ? void 0 : options.isReturning)) {
                    if (result.rowCount > 0)
                        return true;
                    else
                        return false;
                }
                else {
                    return result.rows;
                }
            }
            catch (err) {
                (options === null || options === void 0 ? void 0 : options.isTransaction) && (yield client.query('ROLLBACK'));
                logger_1.debugLogger.debug(`from db utils connect: ${err}`);
                return Error(`${err}`);
            }
            finally {
                client.release();
            }
        }));
    }
}
exports.PGConnect = PGConnect;
const db = new PGConnect(process.env[config.get('db.name')]);
exports.db = db;
