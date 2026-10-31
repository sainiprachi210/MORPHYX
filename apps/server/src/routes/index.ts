import { Router } from 'express';
import healthRoutes from './health.routes.js';
import { AppError } from '../errors/AppError.js';

const apiRouter = Router();

// Health routes
apiRouter.use('/', healthRoutes);

// Catch undefined API routes
apiRouter.use('*', (req, _res, next) => {
  next(AppError.notFound(`API endpoint ${req.originalUrl} not found`, 'ROUTE_NOT_FOUND'));
});

export default apiRouter;
