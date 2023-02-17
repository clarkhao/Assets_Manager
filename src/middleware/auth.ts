import { RequestHandler } from "express";
import { validateToken } from '../utils';

const authHandler: RequestHandler = async function(req, res, next) {
  const authHeader = req.header.authorization;
  if(authHeader) {
    const token = authHeader.split(' ')[1];
    
  }
}

export { authHandler };