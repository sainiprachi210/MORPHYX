import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';
import healthRouter from './routes/health.routes.js';

export const createApp = (): Express => {
  const app = express();

  // Security Headers
  app.use(helmet());

  // CORS Configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile, curl, internal)
        if (!origin) return callback(null, true);
        // Allow any localhost / 127.0.0.1 port in development (e.g. 5173, 5174)
        if (
          env.NODE_ENV === 'development' &&
          /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
        ) {
          return callback(null, true);
        }
        if (origin === env.CORS_ORIGIN) {
          return callback(null, true);
        }
        return callback(null, false);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // Body parsers
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Logging
  app.use(requestLogger);

  // Root & Health direct access
  app.use('/', healthRouter);

  // Namespaced API
  app.use('/api', apiRouter);

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
};

export default createApp;
