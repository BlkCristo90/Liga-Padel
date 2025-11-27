import { Router } from 'express';
import { listPlayers, createPlayer } from '../controllers/player.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/', listPlayers);
router.post('/', authMiddleware, createPlayer);

export default router;
