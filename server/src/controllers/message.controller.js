// ============================================================================
// CONTROLLERS - Message Controller
// ============================================================================

import * as messageService from '../services/message.service.js';
import { successResponse, createdResponse, deletedResponse, badRequestResponse } from '../utils/apiResponse.js';
import { validate } from '../utils/validation.js';
import { createMessageSchema, updateMessageSchema } from '../utils/validation.js';

export const createMessage = async (req, res) => {
  const validation = validate(createMessageSchema)(req.body);
  if (!validation.valid) return badRequestResponse(res, 'Validation failed', validation.errors);
  const message = await messageService.createMessage(validation.data, req.user.id);
  return createdResponse(res, 'Message created', message);
};

export const getMessages = async (req, res) => {
  const { projectId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const messages = await messageService.getProjectMessages(projectId, req.user.id, { page, limit });
  return successResponse(res, 'Messages retrieved', messages);
};

export const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const validation = validate(updateMessageSchema)(req.body);
  if (!validation.valid) return badRequestResponse(res, 'Validation failed', validation.errors);
  const message = await messageService.updateMessage(messageId, req.user.id, validation.data.content);
  return successResponse(res, 'Message updated', message);
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  await messageService.deleteMessage(messageId, req.user.id);
  return deletedResponse(res, 'Message deleted');
};

export default { createMessage, getMessages, updateMessage, deleteMessage };
