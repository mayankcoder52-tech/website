import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from './error.middleware';
import { readDB } from '../config/db';

// Simple interface extending Express Request to include authenticated user details
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

/**
 * Require valid JWT Authentication guard.
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authentication credentials are missing or malformed. Use Authorization: Bearer <token>', 401));
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return next(new AppError('Invalid or expired authentication token. Please log in again.', 401));
  }

  // Inject parsed token payload into request context
  req.user = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
    name: decoded.name
  };

  next();
}

/**
 * Enforce administrator access level guard. Must be preceded by requireAuth.
 */
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    return next(new AppError('User session context missing. Authentication required first.', 401));
  }

  if (req.user.role !== 'Admin') {
    return next(new AppError('Unauthorized access. Administrative privileges required.', 403));
  }

  next();
}
