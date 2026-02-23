// ============================================================================
// CONTROLLERS - Workspace Controller
// ============================================================================

import * as workspaceService from '../services/workspace.service.js';
import { successResponse, createdResponse, deletedResponse, badRequestResponse, notFoundResponse } from '../utils/apiResponse.js';
import { validate } from '../utils/validation.js';
import { createWorkspaceSchema, updateWorkspaceSchema, addWorkspaceMemberSchema } from '../utils/validation.js';

export const createWorkspace = async (req, res) => {
  const validation = validate(createWorkspaceSchema)(req.body);
  if (!validation.valid) {
    return badRequestResponse(res, 'Validation failed', validation.errors);
  }

  const workspace = await workspaceService.createWorkspace(validation.data, req.user.id);
  return createdResponse(res, 'Workspace created successfully', workspace);
};

export const getWorkspaces = async (req, res) => {
  const workspaces = await workspaceService.getUserWorkspaces(req.user.id);
  return successResponse(res, 'Workspaces retrieved', workspaces);
};

export const getWorkspace = async (req, res) => {
  const { workspaceId } = req.params;
  const workspace = await workspaceService.getWorkspaceById(workspaceId, req.user.id);
  return successResponse(res, 'Workspace retrieved', workspace);
};

export const updateWorkspace = async (req, res) => {
  const { workspaceId } = req.params;
  const validation = validate(updateWorkspaceSchema)(req.body);
  if (!validation.valid) {
    return badRequestResponse(res, 'Validation failed', validation.errors);
  }

  const workspace = await workspaceService.updateWorkspace(workspaceId, req.user.id, validation.data);
  return successResponse(res, 'Workspace updated', workspace);
};

export const deleteWorkspace = async (req, res) => {
  const { workspaceId } = req.params;
  await workspaceService.deleteWorkspace(workspaceId, req.user.id);
  return deletedResponse(res, 'Workspace deleted');
};

export const addMember = async (req, res) => {
  const { workspaceId } = req.params;
  const validation = validate(addWorkspaceMemberSchema)(req.body);
  if (!validation.valid) {
    return badRequestResponse(res, 'Validation failed', validation.errors);
  }

  const member = await workspaceService.addWorkspaceMember(workspaceId, req.user.id, validation.data);
  return createdResponse(res, 'Member added', member);
};

export const removeMember = async (req, res) => {
  const { workspaceId, memberId } = req.params;
  await workspaceService.removeWorkspaceMember(workspaceId, req.user.id, memberId);
  return deletedResponse(res, 'Member removed');
};

export const getMembers = async (req, res) => {
  const { workspaceId } = req.params;
  const members = await workspaceService.getWorkspaceMembers(workspaceId, req.user.id);
  return successResponse(res, 'Members retrieved', members);
};

export default {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
  addMember,
  removeMember,
  getMembers,
};