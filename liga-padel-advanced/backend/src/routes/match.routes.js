import { Router } from 'express';
import { listMatches, createMatch } from '../controllers/match.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/', listMatches);
router.post('/', authMiddleware, createMatch);

export default router;
