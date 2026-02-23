// ============================================================================
// CONTROLLERS - Project Controller
// ============================================================================

import * as projectService from '../services/project.service.js';
import { successResponse, createdResponse, deletedResponse, badRequestResponse } from '../utils/apiResponse.js';
import { validate } from '../utils/validation.js';
import { createProjectSchema, updateProjectSchema, addProjectMemberSchema } from '../utils/validation.js';

export const createProject = async (req, res) => {
  const validation = validate(createProjectSchema)(req.body);
  if (!validation.valid) return badRequestResponse(res, 'Validation failed', validation.errors);
  const project = await projectService.createProject(validation.data, req.user.id);
  return createdResponse(res, 'Project created', project);
};

export const getProjects = async (req, res) => {
  const { workspaceId } = req.params;
  const projects = await projectService.getWorkspaceProjects(workspaceId, req.user.id);
  return successResponse(res, 'Projects retrieved', projects);
};

export const getProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await projectService.getProjectById(projectId, req.user.id);
  return successResponse(res, 'Project retrieved', project);
};

export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const validation = validate(updateProjectSchema)(req.body);
  if (!validation.valid) return badRequestResponse(res, 'Validation failed', validation.errors);
  const project = await projectService.updateProject(projectId, req.user.id, validation.data);
  return successResponse(res, 'Project updated', project);
};

export const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  await projectService.deleteProject(projectId, req.user.id);
  return deletedResponse(res, 'Project deleted');
};

export const addMember = async (req, res) => {
  const { projectId } = req.params;
  const validation = validate(addProjectMemberSchema)(req.body);
  if (!validation.valid) return badRequestResponse(res, 'Validation failed', validation.errors);
  const member = await projectService.addProjectMember(projectId, req.user.id, validation.data);
  return createdResponse(res, 'Member added', member);
};

export const removeMember = async (req, res) => {
  const { projectId, memberId } = req.params;
  await projectService.removeProjectMember(projectId, req.user.id, memberId);
  return deletedResponse(res, 'Member removed');
};

export default { createProject, getProjects, getProject, updateProject, deleteProject, addMember, removeMember };
