// ============================================================================
// CONTROLLERS - Dashboard Controller
// ============================================================================

import * as dashboardService from '../services/dashboard.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getDashboard = async (req, res) => {
  const stats = await dashboardService.getDashboardStats(req.user.id);
  return successResponse(res, 'Dashboard data retrieved', stats);
};

export default { getDashboard };
