import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface RequestMetrics {
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
  timestamp: Date;
}

const requestMetrics: RequestMetrics[] = [];

export const performanceMonitoring = (req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime();

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const responseTime = seconds * 1000 + nanoseconds / 1000000; // Convert to milliseconds

    const metrics: RequestMetrics = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: Math.round(responseTime * 100) / 100, // Round to 2 decimal places
      timestamp: new Date(),
    };

    requestMetrics.push(metrics);

    // Keep only last 1000 requests to prevent memory issues
    if (requestMetrics.length > 1000) {
      requestMetrics.shift();
    }

    // Log slow requests (> 1000ms)
    if (responseTime > 1000) {
      logger.warn(`Slow request detected: ${req.method} ${req.originalUrl} - ${responseTime}ms`);
    }
  });

  next();
};

export const getMetrics = (): RequestMetrics[] => {
  return requestMetrics;
};
