import jwt from 'jsonwebtoken';
import { logger, debugLogger } from '../logger';

const validateToken = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env['JWT_KEY'] as jwt.Secret);
    debugLogger.debug(payload);
    return Promise.resolve(payload);
  } catch (err) {
    logger.error(err);
    return Promise.reject(`403 ${err}`);
  }

}

export { validateToken };