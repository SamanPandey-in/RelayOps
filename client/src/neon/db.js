// ============================================================================
// NEON DATABASE QUERY UTILITIES
// ============================================================================

import { neonClient } from './client';

// Re-export the client for database operations
export const db = {
  // Users table
  users: {
    getAll: () => neonClient.from('users').select('*'),
    getById: (id) => neonClient.from('users').select('*').eq('id', id),
    create: (data) => neonClient.from('users').insert(data).select(),
    update: (id, data) => neonClient.from('users').update(data).eq('id', id).select(),
    delete: (id) => neonClient.from('users').delete().eq('id', id),
  },

  // Workspaces table
  workspaces: {
    getAll: () => neonClient.from('workspaces').select('*'),
    getById: (id) => neonClient.from('workspaces').select('*').eq('id', id),
    create: (data) => neonClient.from('workspaces').insert(data).select(),
    update: (id, data) => neonClient.from('workspaces').update(data).eq('id', id).select(),
    delete: (id) => neonClient.from('workspaces').delete().eq('id', id),
  },

  // Projects table
  projects: {
    getAll: () => neonClient.from('projects').select('*'),
    getById: (id) => neonClient.from('projects').select('*').eq('id', id),
    getByWorkspace: (workspaceId) => neonClient.from('projects').select('*').eq('workspace_id', workspaceId),
    create: (data) => neonClient.from('projects').insert(data).select(),
    update: (id, data) => neonClient.from('projects').update(data).eq('id', id).select(),
    delete: (id) => neonClient.from('projects').delete().eq('id', id),
  },

  // Tasks table
  tasks: {
    getAll: () => neonClient.from('tasks').select('*'),
    getById: (id) => neonClient.from('tasks').select('*').eq('id', id),
    getByProject: (projectId) => neonClient.from('tasks').select('*').eq('project_id', projectId),
    getByUser: (userId) => neonClient.from('tasks').select('*').eq('assigned_to', userId),
    create: (data) => neonClient.from('tasks').insert(data).select(),
    update: (id, data) => neonClient.from('tasks').update(data).eq('id', id).select(),
    delete: (id) => neonClient.from('tasks').delete().eq('id', id),
  },
};

export default db;