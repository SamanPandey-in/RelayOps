// ============================================================================
// ROUTES - Workspace Routes
// ============================================================================

import { Router } from 'express';
import workspaceController from '../controllers/workspace.controller.js';
import { authenticate, workspaceMember } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.use(authenticate);

router.post('/', asyncHandler(workspaceController.createWorkspace));
router.get('/', asyncHandler(workspaceController.getWorkspaces));
router.get('/:workspaceId', asyncHandler(workspaceController.getWorkspace));
router.put('/:workspaceId', asyncHandler(workspaceController.updateWorkspace));
router.delete('/:workspaceId', asyncHandler(workspaceController.deleteWorkspace));

// Members
router.get('/:workspaceId/members', asyncHandler(workspaceController.getMembers));
router.post('/:workspaceId/members', asyncHandler(workspaceController.addMember));
router.delete('/:workspaceId/members/:memberId', asyncHandler(workspaceController.removeMember));

export default router;