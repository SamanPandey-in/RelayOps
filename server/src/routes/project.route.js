// ============================================================================
// ROUTES - Project Routes
// ============================================================================

import { Router } from 'express';
import projectController from '../controllers/project.controller.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.use(authenticate);

router.post('/', asyncHandler(projectController.createProject));
router.get('/workspace/:workspaceId', asyncHandler(projectController.getProjects));
router.get('/:projectId', asyncHandler(projectController.getProject));
router.put('/:projectId', asyncHandler(projectController.updateProject));
router.delete('/:projectId', asyncHandler(projectController.deleteProject));

router.post('/:projectId/members', asyncHandler(projectController.addMember));
router.delete('/:projectId/members/:memberId', asyncHandler(projectController.removeMember));

export default router;