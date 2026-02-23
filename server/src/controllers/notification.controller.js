// ============================================================================
// CONTROLLERS - Notification Controller
// ============================================================================

import * as notificationService from '../services/notification.service.js';
import { successResponse, deletedResponse } from '../utils/apiResponse.js';

export const getNotifications = async (req, res) => {
  const { page = 1, limit = 20, unreadOnly } = req.query;
  const result = await notificationService.getUserNotifications(req.user.id, {
    page: parseInt(page),
    limit: parseInt(limit),
    unreadOnly: unreadOnly === 'true',
  });
  return successResponse(res, 'Notifications retrieved', result);
};

export const markAsRead = async (req, res) => {
  const { notificationId } = req.params;
  await notificationService.markAsRead(notificationId, req.user.id);
  return successResponse(res, 'Notification marked as read');
};

export const markAllAsRead = async (req, res) => {
  await notificationService.markAllAsRead(req.user.id);
  return successResponse(res, 'All notifications marked as read');
};

export const getUnreadCount = async (req, res) => {
  const count = await notificationService.getUnreadCount(req.user.id);
  return successResponse(res, 'Unread count', { count });
};

export default { getNotifications, markAsRead, markAllAsRead, getUnreadCount };
