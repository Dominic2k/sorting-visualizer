import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi, type AuthResponse, type UserInfo } from '../api/authApi';

interface AuthContextType {
  user: UserInfo | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Backend URL for OAuth2
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // Handle OAuth2 callback - check URL for token
      const urlParams = new URLSearchParams(window.location.search);
      const callbackToken = urlParams.get('token');
      
      if (callbackToken) {
        // Save token from OAuth2 callback
        localStorage.setItem('token', callbackToken);
        setToken(callbackToken);
        
        // Clean up URL (remove token from URL bar)
        window.history.replaceState({}, document.title, window.location.pathname);
        
        try {
          const userInfo = await authApi.getCurrentUser();
          setUser(userInfo);
        } catch {
          localStorage.removeItem('token');
          setToken(null);
        }
        setIsLoading(false);
        return;
      }

      // Normal token check
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const userInfo = await authApi.getCurrentUser();
          setUser(userInfo);
          setToken(storedToken);
        } catch {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const handleAuthSuccess = (response: AuthResponse) => {
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser({
      email: response.email,
      displayName: response.displayName,
      createdAt: new Date().toISOString(),
    });
  };

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    handleAuthSuccess(response);
  };

  const register = async (email: string, password: string, displayName: string) => {
    const response = await authApi.register({ email, password, displayName });
    handleAuthSuccess(response);
  };

  // Redirect to backend OAuth2 endpoint
  const loginWithGoogle = () => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

