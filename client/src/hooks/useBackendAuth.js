// ============================================================================
// AUTH HOOK - Backend API based authentication
// ============================================================================

import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useBackendAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.data);
            setIsAuthenticated(true);
          } else {
            // Token invalid, clear it
            localStorage.removeItem('authToken');
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (err) {
        console.error('Failed to get session:', err);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Login failed' };
      }

      if (data.data?.accessToken) {
        localStorage.setItem('authToken', data.data.accessToken);
        if (data.data.refreshToken) {
          localStorage.setItem('refreshToken', data.data.refreshToken);
        }
        setUser(data.data.user);
        setIsAuthenticated(true);
        return { success: true, user: data.data.user };
      }

      return { success: false, error: 'Login failed - no token returned' };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    }
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Registration failed' };
      }

      // Auto-login after registration if token is provided
      if (data.data?.accessToken) {
        localStorage.setItem('authToken', data.data.accessToken);
        if (data.data.refreshToken) {
          localStorage.setItem('refreshToken', data.data.refreshToken);
        }
        setUser(data.data.user);
        setIsAuthenticated(true);
        return { success: true, user: data.data.user };
      }

      return { success: true, user: data.data };
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    }

    // Clear local state regardless of API result
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return { success: false, error: 'No authentication token' };
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Update failed' };
      }

      if (data.data) {
        setUser(data.data);
        return { success: true, user: data.data };
      }

      return { success: false, error: 'Update failed' };
    } catch (err) {
      return { success: false, error: err.message || 'Update failed' };
    }
  }, []);

  const requestPasswordReset = useCallback(async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          redirectUrl: window.location.origin + '/reset-password',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Password reset request failed' };
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Password reset request failed' };
    }
  }, []);

  // OAuth sign-in (placeholder - implement based on your OAuth provider)
  const signInWithOAuth = useCallback(async (provider) => {
    try {
      // This would typically redirect to your OAuth endpoint
      window.location.href = `${API_BASE_URL}/auth/oauth/${provider}`;
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'OAuth sign-in failed' };
    }
  }, []);

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    requestPasswordReset,
    signInWithOAuth,
  };
};

export default useBackendAuth;
