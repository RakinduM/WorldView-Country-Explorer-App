import { createContext, useState, useEffect, useCallback } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((token) => {
    const decoded = jwt_decode(token);
    localStorage.setItem('token', token);
    setToken(token);
    setUser(decoded);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwt_decode(storedToken);
        setUser(decoded);
        setToken(storedToken);
      } catch (error) {
        console.error('Invalid token', error);
        logout();
      }
    }
    setIsLoading(false);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};