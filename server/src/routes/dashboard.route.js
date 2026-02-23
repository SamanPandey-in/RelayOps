// ============================================================================
// ROUTES - Dashboard Routes
// ============================================================================

import { Router } from 'express';
import dashboardController from '../controllers/dashboard.controller.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(dashboardController.getDashboard));

export default router;