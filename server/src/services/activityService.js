import { prisma } from '../prisma/client.js';

export const logActivity = async (data) => {
  try {
    await prisma.activityLog.create({
      data: {
        entityType: data.entityType,
        entityId: data.entityId,
        projectId: data.projectId,
        userId: data.userId,
        action: data.action,
        oldValue: data.oldValue || null,
        newValue: data.newValue || null,
      },
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};
