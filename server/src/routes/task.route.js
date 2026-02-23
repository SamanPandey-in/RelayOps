// ============================================================================
// ROUTES - Task Routes
// ============================================================================

import { Router } from 'express';
import taskController from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.use(authenticate);

router.post('/', asyncHandler(taskController.createTask));
router.get('/my-tasks', asyncHandler(taskController.getMyTasks));
router.get('/project/:projectId', asyncHandler(taskController.getTasks));
router.get('/:taskId', asyncHandler(taskController.getTask));
router.put('/:taskId', asyncHandler(taskController.updateTask));
router.delete('/:taskId', asyncHandler(taskController.deleteTask));

export default router;