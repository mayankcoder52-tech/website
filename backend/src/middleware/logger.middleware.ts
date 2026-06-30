import { Request, Response, NextFunction } from 'express';

/**
 * Performance and audit logging middleware. Logs high-resolution timing of response completions.
 */
export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const startTime = process.hrtime();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  // Listen for the finish event on the response to log after execution
  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startTime);
    const elapsedTimeInMs = (elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6).toFixed(2);
    
    let colorCode = '\x1b[32m'; // Green for 2xx
    if (res.statusCode >= 500) {
      colorCode = '\x1b[31m'; // Red for 5xx
    } else if (res.statusCode >= 400) {
      colorCode = '\x1b[33m'; // Yellow for 4xx
    } else if (res.statusCode >= 300) {
      colorCode = '\x1b[36m'; // Cyan for 3xx
    }

    const resetColor = '\x1b[0m';
    const methodColor = '\x1b[1m\x1b[34m'; // Bold Blue

    console.log(
      `[${new Date().toISOString()}] ${ip} - ${methodColor}${req.method}${resetColor} ${req.originalUrl} -> ${colorCode}${res.statusCode}${resetColor} (${elapsedTimeInMs}ms)`
    );
  });

  next();
}
