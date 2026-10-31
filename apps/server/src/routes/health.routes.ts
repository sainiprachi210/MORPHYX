import { Router, Request, Response } from 'express';
import { APP_NAME, APP_VERSION, HealthResponse } from '@morphyx/shared';
import { env } from '../config/env.js';

const router = Router();
const startTime = Date.now();

router.get('/health', (_req: Request, res: Response) => {
  const uptimeSeconds = (Date.now() - startTime) / 1000;
  const memoryUsage = process.memoryUsage();
  const memoryUsageMB = Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100;

  const healthData: HealthResponse = {
    status: 'healthy',
    service: `${APP_NAME}-Server`,
    version: APP_VERSION,
    timestamp: new Date().toISOString(),
    uptime: Math.round(uptimeSeconds * 100) / 100,
    environment: env.NODE_ENV,
    system: {
      nodeVersion: process.version,
      memoryUsageMB,
    },
  };

  res.status(200).json({
    success: true,
    data: healthData,
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
