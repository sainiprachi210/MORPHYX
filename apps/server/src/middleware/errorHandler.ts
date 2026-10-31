import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const timestamp = new Date().toISOString();

  // Handle known operational AppError
  if (err instanceof AppError) {
    logger.warn(`Operational error: [${err.code}] ${err.message}`, 'ErrorHandler', {
      statusCode: err.statusCode,
      details: err.details,
    });

    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
      meta: { timestamp },
    });
    return;
  }

  // Handle Zod schema validation error
  if (err instanceof ZodError) {
    logger.warn('Schema validation error', 'ErrorHandler', { issues: err.issues });
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request payload validation failed',
        details: err.issues.map(i => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      },
      meta: { timestamp },
    });
    return;
  }

  // Handle unexpected internal server error
  logger.error('Unhandled server exception', err, 'ErrorHandler');

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message:
        env.NODE_ENV === 'production'
          ? 'An internal error occurred'
          : err.message || 'Unknown server error',
    },
    meta: { timestamp },
  });
};
