import { Router } from 'express';
import { getProjectPresence } from '../controllers/presence.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

// GET /api/presence/:projectId - SSE endpoint for real-time presence
router.get('/:projectId', authMiddleware, getProjectPresence);

export default router;
