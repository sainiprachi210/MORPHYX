import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    logger.info(`${method} ${originalUrl} ${statusCode} - ${duration}ms`, 'HTTP', {
      method,
      url: originalUrl,
      status: statusCode,
      durationMs: duration,
      userAgent: req.get('user-agent'),
      ip: req.ip,
    });
  });

  next();
};
