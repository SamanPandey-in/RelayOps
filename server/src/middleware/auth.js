// ============================================================================
// MIDDLEWARE - Authentication JWT Middleware
// ============================================================================

import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { prisma } from '../config/database.js';
import { unauthorizedResponse, forbiddenResponse } from '../utils/apiResponse.js';

/**
 * Extract JWT token from Authorization header
 */
const extractToken = (authHeader) => {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  
  return parts[1];
};

/**
 * Verify JWT token and attach user to request
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = extractToken(req.headers.authorization);
    
    if (!token) {
      return unauthorizedResponse(res, 'No token provided');
    }
    
    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        imageUrl: true,
        role: true,
        isActive: true,
      },
    });
    
    if (!user) {
      return unauthorizedResponse(res, 'User not found');
    }
    
    if (!user.isActive) {
      return unauthorizedResponse(res, 'Account is deactivated');
    }
    
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return unauthorizedResponse(res, 'Token expired');
    }
    if (error.name === 'JsonWebTokenError') {
      return unauthorizedResponse(res, 'Invalid token');
    }
    return unauthorizedResponse(res, 'Authentication failed');
  }
};

/**
 * Optional authentication - doesn't fail if no token, but attaches user if valid
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req.headers.authorization);
    
    if (token) {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          imageUrl: true,
          role: true,
        },
      });
      
      if (user && user.isActive) {
        req.user = user;
      }
    }
  } catch (error) {
    // Ignore errors for optional auth
  }
  
  next();
};

/**
 * Role-based authorization middleware
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return unauthorizedResponse(res, 'Authentication required');
    }
    
    if (!roles.includes(req.user.role)) {
      return forbiddenResponse(res, 'Insufficient permissions');
    }
    
    next();
  };
};

/**
 * Check if user is workspace member
 */
export const workspaceMember = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    
    if (!workspaceId) {
      return next();
    }
    
    const membership = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId,
        userId: req.user.id,
      },
    });
    
    if (!membership) {
      return forbiddenResponse(res, 'Not a member of this workspace');
    }
    
    req.workspaceMember = membership;
    next();
  } catch (error) {
    return unauthorizedResponse(res, 'Authorization failed');
  }
};

/**
 * Check if user is workspace admin
 */
export const workspaceAdmin = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    
    if (!workspaceId) {
      return next();
    }
    
    const membership = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId,
        userId: req.user.id,
        role: 'ADMIN',
      },
    });
    
    if (!membership) {
      return forbiddenResponse(res, 'Workspace admin access required');
    }
    
    req.workspaceMember = membership;
    next();
  } catch (error) {
    return unauthorizedResponse(res, 'Authorization failed');
  }
};

/**
 * Check if user is project member
 */
export const projectMember = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    
    if (!projectId) {
      return next();
    }
    
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: req.user.id,
      },
    });
    
    if (!membership) {
      return forbiddenResponse(res, 'Not a member of this project');
    }
    
    req.projectMember = membership;
    next();
  } catch (error) {
    return unauthorizedResponse(res, 'Authorization failed');
  }
};

export default { authenticate, optionalAuth, authorize, workspaceMember, workspaceAdmin, projectMember };