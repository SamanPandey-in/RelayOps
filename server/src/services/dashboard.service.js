// ============================================================================
// SERVICES - Dashboard Service
// ============================================================================

import { prisma } from '../config/database.js';

export const getDashboardStats = async (userId) => {
  // Get user's workspaces
  const workspaceMemberships = await prisma.workspaceMember.findMany({
    where: { userId },
    select: { workspaceId: true },
  });

  const workspaceIds = workspaceMemberships.map(m => m.workspaceId);

  // Get task counts by status
  const taskStats = await prisma.task.groupBy({
    by: ['status'],
    where: {
      OR: [
        { assigneeId: userId },
        { reporterId: userId },
        { project: { workspaceId: { in: workspaceIds } } },
      ],
    },
    _count: true,
  });

  // Get overdue tasks
  const overdueTasks = await prisma.task.count({
    where: {
      assigneeId: userId,
      dueDate: { lt: new Date() },
      status: { not: 'DONE' },
    },
  });

  // Get my tasks
  const myTasks = await prisma.task.findMany({
    where: { assigneeId: userId },
    select: {
      id: true, title: true, status: true, priority: true, dueDate: true,
      project: { select: { id: true, name: true } },
    },
    orderBy: [{ dueDate: 'asc' }, { createdAt: 'desc' }],
    take: 10,
  });

  // Get project progress
  const projectProgress = await prisma.project.findMany({
    where: { workspaceId: { in: workspaceIds } },
    select: {
      id: true, name: true, status: true, progress: true,
      _count: { select: { tasks: true } },
    },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  });

  // Format task stats
  const tasksByStatus = {
    TODO: 0,
    IN_PROGRESS: 0,
    IN_REVIEW: 0,
    DONE: 0,
  };
  taskStats.forEach(stat => {
    tasksByStatus[stat.status] = stat._count;
  });

  return {
    tasksByStatus,
    overdueTasks,
    myTasks,
    projectProgress,
    totalProjects: await prisma.project.count({ where: { workspaceId: { in: workspaceIds } } }),
  };
};

export default { getDashboardStats };