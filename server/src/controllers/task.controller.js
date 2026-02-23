// ============================================================================
// CONTROLLERS - Task Controller
// ============================================================================

import * as taskService from '../services/task.service.js';
import { successResponse, createdResponse, deletedResponse, badRequestResponse } from '../utils/apiResponse.js';
import { validate } from '../utils/validation.js';
import { createTaskSchema, updateTaskSchema, taskFilterSchema } from '../utils/validation.js';

export const createTask = async (req, res) => {
  const validation = validate(createTaskSchema)(req.body);
  if (!validation.valid) return badRequestResponse(res, 'Validation failed', validation.errors);
  const task = await taskService.createTask(validation.data, req.user.id);
  return createdResponse(res, 'Task created', task);
};

export const getTasks = async (req, res) => {
  const { projectId } = req.params;
  const filters = {};
  if (req.query.status) filters.status = req.query.status;
  if (req.query.priority) filters.priority = req.query.priority;
  if (req.query.assigneeId) filters.assigneeId = req.query.assigneeId;
  const tasks = await taskService.getProjectTasks(projectId, req.user.id, filters);
  return successResponse(res, 'Tasks retrieved', tasks);
};

export const getTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await taskService.getTaskById(taskId, req.user.id);
  return successResponse(res, 'Task retrieved', task);
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const validation = validate(updateTaskSchema)(req.body);
  if (!validation.valid) return badRequestResponse(res, 'Validation failed', validation.errors);
  const task = await taskService.updateTask(taskId, req.user.id, validation.data);
  return successResponse(res, 'Task updated', task);
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await taskService.deleteTask(taskId, req.user.id);
  return deletedResponse(res, 'Task deleted');
};

export const getMyTasks = async (req, res) => {
  const tasks = await taskService.getMyTasks(req.user.id);
  return successResponse(res, 'My tasks retrieved', tasks);
};

export default { createTask, getTasks, getTask, updateTask, deleteTask, getMyTasks };
