import { Router } from 'express';
import { listUsers, deleteUser, resetPoints } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/roles.middleware.js';

const router = Router();

router.get('/users', authMiddleware, requireRole('ADMIN'), listUsers);
router.delete('/users/:id', authMiddleware, requireRole('ADMIN'), deleteUser);
router.post('/reset-points', authMiddleware, requireRole('ADMIN'), resetPoints);

export default router;
