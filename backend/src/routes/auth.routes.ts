import { Router } from 'express';
import { getProfile, register, login, logout } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validation.middleware';

const router = Router();

router.get('/profile', getProfile);

router.post(
  '/auth/register',
  validateBody({
    name: { required: true, type: 'string', minLength: 2, maxLength: 50 },
    email: { 
      required: true, 
      type: 'string', 
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    }
  }),
  register
);

router.post(
  '/auth/login',
  validateBody({
    email: { 
      required: true, 
      type: 'string', 
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    }
  }),
  login
);

router.post('/auth/logout', logout);

export default router;
