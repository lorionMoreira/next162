'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  username: string | null;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface UseAuthReturn extends AuthState {
  login: (credentials: LoginCredentials, isAdmin?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: (isAdmin?: boolean) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
    username: null,
  });

  const checkAuth = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch('/api/auth/check');
      if (response.ok) {
        const data = await response.json();
        setState({
          isAuthenticated: data.isAuthenticated,
          isAdmin: data.isAdmin || false,
          username: data.username || null,
          isLoading: false,
        });
      } else {
        setState({
          isAuthenticated: false,
          isAdmin: false,
          username: null,
          isLoading: false,
        });
      }
    } catch {
      setState({
        isAuthenticated: false,
        isAdmin: false,
        username: null,
        isLoading: false,
      });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (
    credentials: LoginCredentials,
    isAdmin: boolean = false
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const endpoint = isAdmin ? '/api/auth/admin-login' : '/api/auth/login';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      setState({
        isAuthenticated: true,
        isAdmin,
        username: credentials.username,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  };

  const logout = async (isAdmin: boolean = false): Promise<void> => {
    try {
      await fetch(`/api/auth/logout?admin=${isAdmin}`, {
        method: 'POST',
      });

      setState({
        isAuthenticated: false,
        isAdmin: false,
        username: null,
        isLoading: false,
      });

      router.push(isAdmin ? '/admin/login' : '/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    ...state,
    login,
    logout,
    checkAuth,
  };
}

export default useAuth;
