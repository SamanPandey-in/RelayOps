import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

// Import Redux actions
import { setTeams } from '../store/slices/teamsSlice';
import { setProjects } from '../store/slices/projectsSlice';
import { setTasks, setTasksLoading, setTasksError } from '../store/slices/tasksSlice';

/**
 * Custom hook to initialize all app data after authentication
 * Fetches teams, projects, and tasks in parallel
 * Automatically runs when user authenticates
 */
export const useInitializeAppData = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const initializeRef = useRef(false);

  useEffect(() => {
    // Only initialize once when authenticated and not already initializing
    if (!isAuthenticated || authLoading || initializeRef.current) {
      return;
    }

    initializeRef.current = true;

    const initializeAppData = async () => {
      try {
        dispatch(setTasksLoading(true));
        dispatch(setTasksError(null));

        // Fetch all data in parallel for better performance
        const [teamsRes, projectsRes, tasksRes] = await Promise.all([
          api.get('/api/teams'),
          api.get('/api/projects'),
          api.get('/api/tasks'),
        ]);

        // Dispatch data to Redux store
        if (teamsRes.data?.teams) {
          dispatch(setTeams(teamsRes.data.teams));
        }

        if (projectsRes.data?.projects) {
          dispatch(setProjects(projectsRes.data.projects));
        }

        if (tasksRes.data?.tasks) {
          dispatch(setTasks(tasksRes.data.tasks));
        }

        console.log('[App] Initialized teams, projects, and tasks');
      } catch (error) {
        console.error('[App] Failed to initialize app data:', error);
        dispatch(setTasksError(error.response?.data?.message || 'Failed to load app data'));
        
        // Continue anyway - app should still be functional with fallback data
        dispatch(setTasksLoading(false));
      } finally {
        dispatch(setTasksLoading(false));
      }
    };

    initializeAppData();
  }, [isAuthenticated, authLoading, dispatch]);
};
