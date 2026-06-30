import express from 'express';
import apiRouter from './src/routes/index';
import { loggerMiddleware } from './src/middleware/logger.middleware';
import { errorHandler } from './src/middleware/error.middleware';

const app = express();

// Standard middlewares
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes under /api prefix
app.use('/api', apiRouter);

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Centralized error interceptor
app.use(errorHandler);

export default app;
