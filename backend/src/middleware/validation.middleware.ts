import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

export type ValidatorSchema = {
  [key: string]: {
    required?: boolean;
    type?: 'string' | 'number' | 'boolean' | 'array' | 'object';
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
  };
};

/**
 * High-performance schema payload validator middleware.
 */
export function validateBody(schema: ValidatorSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: Array<{ field: string; message: string }> = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body[field];

      // Check required
      if (rules.required && (value === undefined || value === null || value === '')) {
        errors.push({ field, message: `The '${field}' input field is required.` });
        continue;
      }

      if (value !== undefined && value !== null) {
        // Check type
        if (rules.type) {
          if (rules.type === 'array' && !Array.isArray(value)) {
            errors.push({ field, message: `The '${field}' must be a valid array list.` });
            continue;
          } else if (rules.type !== 'array' && typeof value !== rules.type) {
            errors.push({ field, message: `The '${field}' must be of type '${rules.type}'.` });
            continue;
          }
        }

        // Check lengths for strings
        if (typeof value === 'string') {
          if (rules.minLength && value.length < rules.minLength) {
            errors.push({ field, message: `The '${field}' must be at least ${rules.minLength} characters long.` });
          }
          if (rules.maxLength && value.length > rules.maxLength) {
            errors.push({ field, message: `The '${field}' cannot exceed ${rules.maxLength} characters.` });
          }
          if (rules.pattern && !rules.pattern.test(value)) {
            errors.push({ field, message: `The '${field}' format is invalid.` });
          }
        }

        // Custom validation check
        if (rules.custom) {
          const customResult = rules.custom(value);
          if (typeof customResult === 'string') {
            errors.push({ field, message: customResult });
          } else if (!customResult) {
            errors.push({ field, message: `The '${field}' failed custom validation conditions.` });
          }
        }
      }
    }

    if (errors.length > 0) {
      return next(new AppError('Invalid request payload validation failed.', 400, errors));
    }

    next();
  };
}
