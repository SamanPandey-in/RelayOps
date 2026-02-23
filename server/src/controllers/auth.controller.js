// ============================================================================
// CONTROLLERS - Authentication Controller
// ============================================================================

import * as authService from '../services/auth.service.js';
import { successResponse, createdResponse, badRequestResponse } from '../utils/apiResponse.js';
import { validate } from '../utils/validation.js';
import { registerSchema, loginSchema, refreshTokenSchema } from '../utils/validation.js';

/**
 * Register new user
 */
export const register = async (req, res) => {
  const validation = validate(registerSchema)(req.body);
  if (!validation.valid) {
    return badRequestResponse(res, 'Validation failed', validation.errors);
  }

  const user = await authService.registerUser(validation.data);
  return createdResponse(res, 'User registered successfully', user);
};

/**
 * Login user
 */
export const login = async (req, res) => {
  const validation = validate(loginSchema)(req.body);
  if (!validation.valid) {
    return badRequestResponse(res, 'Validation failed', validation.errors);
  }

  const result = await authService.loginUser(validation.data);
  return successResponse(res, 'Login successful', result);
};

/**
 * Refresh access token
 */
export const refreshToken = async (req, res) => {
  const validation = validate(refreshTokenSchema)(req.body);
  if (!validation.valid) {
    return badRequestResponse(res, 'Validation failed', validation.errors);
  }

  const result = await authService.refreshAccessToken(validation.data.refreshToken);
  return successResponse(res, 'Token refreshed', result);
};

/**
 * Logout user
 */
export const logout = async (req, res) => {
  await authService.logoutUser(req.user.id);
  return successResponse(res, 'Logged out successfully');
};

/**
 * Get current user profile
 */
export const getProfile = async (req, res) => {
  const user = await authService.getUserProfile(req.user.id);
  return successResponse(res, 'Profile retrieved', user);
};

/**
 * Update user profile
 */
export const updateProfile = async (req, res) => {
  const user = await authService.updateUserProfile(req.user.id, req.body);
  return successResponse(res, 'Profile updated', user);
};

export default {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
  updateProfile,
};
