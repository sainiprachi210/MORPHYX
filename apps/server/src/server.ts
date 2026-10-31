import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { APP_NAME, APP_VERSION } from '@morphyx/shared';

const app = createApp();

const server = app.listen(env.PORT, env.HOST, () => {
  logger.info(
    `[SERVER READY] ${APP_NAME} v${APP_VERSION} listening on http://${env.HOST}:${env.PORT}`,
    'Bootstrap',
    {
      environment: env.NODE_ENV,
      corsOrigin: env.CORS_ORIGIN,
      healthCheck: `http://${env.HOST}:${env.PORT}/api/health`,
    }
  );
});

// Graceful shutdown handling
const handleShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`, 'Lifecycle');
  server.close(() => {
    logger.info('HTTP server closed successfully.', 'Lifecycle');
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    logger.error(
      'Could not close connections in time, forcefully shutting down',
      undefined,
      'Lifecycle'
    );
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

process.on('uncaughtException', err => {
  logger.error('Uncaught Exception occurred!', err, 'Lifecycle');
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Rejection detected!', reason, 'Lifecycle');
  process.exit(1);
});
