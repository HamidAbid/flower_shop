import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const TOKEN_KEY = 'token';
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem(TOKEN_KEY) || ''
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(true);


  // Store token in localStorage
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem(TOKEN_KEY, serverToken);
    setToken(serverToken);
    setIsLoggedIn(true);
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await axios.post(`/api/auth/logout`);
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setToken('');
      setIsLoggedIn(false);
      setUser(null);
      navigate('/');
    }
  };



  // Login user
  const login = async (credentials) => {
    try {
      const res = await axios.post(`/api/auth/login`, credentials);
      const serverToken = res.data.token;
      storeTokenInLS(serverToken);
      await fetchUser();
      setAuthError(null);
      navigate(res.data.user?.role === 'admin' ? '/admin/dashboard' : '/account');
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Login failed');
    }
  };

  // Register user
  const register = async (data) => {
    try {
      const res = await axios.post(`/api/auth/register`, data);
      const serverToken = res.data.token;
      storeTokenInLS(serverToken);
      await fetchUser();
      setAuthError(null);
      navigate('/account');
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Registration failed');
    }
  };

    // Fetch user data with token
    const fetchUser = async () => {
     if(!token) return
     try {
      const res = await axios.get(`/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Fetch user failed:', err);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
    };
  // On first mount, check localStorage for token
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      setToken(savedToken);
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn,
        authError,
        setAuthError,
        loading,
        login,
        register,
        logout: logoutUser,
        storeTokenInLS,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy context usage
export const useAuth = () => useContext(AuthContext);
