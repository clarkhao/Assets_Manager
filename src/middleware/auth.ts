import { RequestHandler } from "express";
import { validateToken } from '../utils';

const authHandler: RequestHandler = async function(req, res, next) {
  const authHeader = req.headers['Authorization'] as string;
  if(authHeader) {
    const token = authHeader.split(' ')[1];
    validateToken(token).then(res => {
      if(res instanceof Error)
        next(res);
      else
        next();
    })
  } else {
    next(new Error(`401 not authorized`));
  }
}

export { authHandler };