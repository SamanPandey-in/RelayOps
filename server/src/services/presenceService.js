// In-memory presence store: Map<projectId, Set<userId>>
const presence = new Map();

export const joinPresence = (projectId, userId) => {
  if (!presence.has(projectId)) {
    presence.set(projectId, new Set());
  }
  presence.get(projectId).add(userId);
};

export const leavePresence = (projectId, userId) => {
  if (presence.has(projectId)) {
    presence.get(projectId).delete(userId);
    if (presence.get(projectId).size === 0) {
      presence.delete(projectId);
    }
  }
};

export const getPresenceCount = (projectId) => {
  return presence.has(projectId) ? presence.get(projectId).size : 0;
};

export const getPresenceUsers = (projectId) => {
  return presence.has(projectId) ? Array.from(presence.get(projectId)) : [];
};

// Broadcast to all connected clients for a project
const clients = new Map(); // Map<projectId, Set<response objects>>

export const subscribeToPresence = (projectId, res) => {
  if (!clients.has(projectId)) {
    clients.set(projectId, new Set());
  }
  clients.get(projectId).add(res);
};

export const unsubscribeFromPresence = (projectId, res) => {
  if (clients.has(projectId)) {
    clients.get(projectId).delete(res);
    if (clients.get(projectId).size === 0) {
      clients.delete(projectId);
    }
  }
};

export const broadcastPresenceUpdate = (projectId) => {
  if (clients.has(projectId)) {
    const count = getPresenceCount(projectId);
    const data = `data: ${JSON.stringify({ count, users: getPresenceUsers(projectId) })}\n\n`;
    
    clients.get(projectId).forEach((res) => {
      try {
        res.write(data);
      } catch (error) {
        // Client disconnected, remove them
        unsubscribeFromPresence(projectId, res);
      }
    });
  }
};
