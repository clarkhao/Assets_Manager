import jwt from 'jsonwebtoken';
import { debugLogger } from '../logger';

const validateToken = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env['JWT_KEY'] as jwt.Secret);
    debugLogger.debug(payload);
    return Promise.resolve(payload);
  } catch (err) {
    return Promise.reject(`403 ${err}`);
  }

}

export { validateToken };