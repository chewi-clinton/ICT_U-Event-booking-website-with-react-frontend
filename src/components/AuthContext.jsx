import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      setIsAuthenticated(true);
      setUser({ id: userId });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(false);
  };

  const login = (token, userId) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", userId);
    setIsAuthenticated(true);
    setUser({ id: userId });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
