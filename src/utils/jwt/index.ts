import jwt from 'jsonwebtoken';
import { logger, debugLogger } from '../logger';

const validateToken = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env['JWT_KEY'] as jwt.Secret);
    debugLogger.debug(`from utils/jwt payload: ${JSON.stringify(payload)}`);
    return Promise.resolve(payload);
  } catch (err) {
    debugLogger.debug(`from utils/jwt error: ${err}`);
    return Promise.resolve(new Error(`403 ${err}`));
  }

}

export { validateToken };