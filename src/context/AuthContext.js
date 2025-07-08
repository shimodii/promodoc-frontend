import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Load token from localStorage on startup
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      console.log('🔁 Restoring token from localStorage');
      setToken(storedToken);
    }
  }, []);

  // Save token to localStorage and state
  const login = (newToken) => {
    console.log('✅ Login: Storing token');
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  // Clear token from everywhere
  const logout = () => {
    console.log('🚪 Logout: Clearing token');
    localStorage.removeItem('authToken');
    setToken(null);
  };

  // Decode role from token
  const getRole = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.role || null;
    } catch (err) {
      console.error('❌ Error decoding token:', err);
      return null;
    }
  };

  // Optional: decode user ID or email
  const getUserId = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.id || null;
    } catch {
      return null;
    }
  };

  const getUser = () => {
    if (!token) return null
    try {
      return jwtDecode(token)
    } catch {
      return null
    }
  }


  const isAuthenticated = !!token;

  // return (
    // <AuthContext.Provider
      // value={{ token, login, logout, isAuthenticated, getRole, getUserId }}
    // >
      // <AuthContext.Provider value={{
  // token,
  // login,
  // logout,
  // isAuthenticated,
  // getRole,
  // getUserId,
  // getUser // ✅ ← Add this line
// }}></AuthContext.Provider>
      // {children}
    // </AuthContext.Provider>

    return (
  <AuthContext.Provider
    value={{
      token,
      login,
      logout,
      isAuthenticated,
      getRole,
      getUserId,
      getUser // ✅ No comma needed here if it's the last item
    }}
  >
    {children}
  </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);