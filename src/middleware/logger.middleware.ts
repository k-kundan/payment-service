import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.util';

function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  logger.info(`${request.method} ${request.path} ${response.statusCode}`);
  next();
}

export default loggerMiddleware;




