import { ErrorRequestHandler } from "express";
import {logger, debugLogger} from '../utils';
//错误处理
const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
    debugLogger.debug(`from error middleware: ${err.stack}`);
    try {
        const [numStr, ...messageArray] = err.message.split(' ') as string[];
        const num = parseInt(numStr);
        const statusCode = Number.isNaN(num) ? 400 : num;
        const message = Number.isNaN(num) ? err.message : messageArray.join(' ');
        res.status(statusCode).json({error: message});
    } catch(error) {
        debugLogger.debug(`from errorHandler: ${error}`);
        res.status(500).json({msg: `${error}`});
    }
}

export {errorHandler};