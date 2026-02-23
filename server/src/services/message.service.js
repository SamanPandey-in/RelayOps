// ============================================================================
// SERVICES - Message Service
// ============================================================================

import { prisma } from '../config/database.js';

export const createMessage = async (data, authorId) => {
  const message = await prisma.message.create({
    data: {
      projectId: data.projectId,
      authorId,
      content: data.content,
      parentId: data.parentId || null,
    },
    include: {
      author: { select: { id: true, name: true, imageUrl: true } },
    },
  });
  return message;
};

export const getProjectMessages = async (projectId, userId, { page = 1, limit = 50 } = {}) => {
  const membership = await prisma.projectMember.findFirst({ where: { projectId, userId } });
  if (!membership) throw new Error('Access denied');

  const messages = await prisma.message.findMany({
    where: { projectId, parentId: null },
    include: {
      author: { select: { id: true, name: true, imageUrl: true } },
      replies: {
        include: { author: { select: { id: true, name: true, imageUrl: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });

  return messages.reverse();
};

export const updateMessage = async (messageId, userId, content) => {
  const message = await prisma.message.findUnique({ where: { id: messageId } });
  if (!message) throw new Error('Message not found');
  if (message.authorId !== userId) throw new Error('Not authorized');

  return prisma.message.update({
    where: { id: messageId },
    data: { content, isEdited: true },
    include: { author: { select: { id: true, name: true, imageUrl: true } } },
  });
};

export const deleteMessage = async (messageId, userId) => {
  const message = await prisma.message.findUnique({ where: { id: messageId } });
  if (!message) throw new Error('Message not found');
  if (message.authorId !== userId) throw new Error('Not authorized');

  await prisma.message.delete({ where: { id: messageId } });
};

export default { createMessage, getProjectMessages, updateMessage, deleteMessage };
