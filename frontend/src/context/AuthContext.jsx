import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();
  // Verify auth using httpOnly cookie via backend
  const checkAuth = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/me', {
        method: 'GET',
        credentials: 'include',
      });
      setIsAuthenticated(res.ok);
    } catch (_err) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async () => {
    // After successful login request elsewhere, refresh auth state
    await checkAuth();
  };

  const logout = async () => {
    // If you add a backend logout endpoint, call it here. For now, just reset state.
    setIsAuthenticated(false);
  };

  //passing value to the provider
  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
