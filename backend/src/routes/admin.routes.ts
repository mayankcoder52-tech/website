import { Router } from 'express';
import { getAdminStats, getAuditLogs, createAuditLog, resetDB, seedProblems } from '../controllers/admin.controller';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Apply auth and admin protections to all administrative routes
router.get('/admin/stats', requireAuth, requireAdmin, getAdminStats);
router.get('/admin/audit-logs', requireAuth, requireAdmin, getAuditLogs);
router.post('/admin/logs', requireAuth, requireAdmin, createAuditLog);
router.post('/admin/reset', requireAuth, requireAdmin, resetDB);
router.post('/admin/seed', requireAuth, requireAdmin, seedProblems);

export default router;
