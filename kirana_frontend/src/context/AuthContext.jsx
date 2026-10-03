import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';
import socket from '../api/socket';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('apnabazar_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.get('/auth/me')
        .then(res => {
          setUser(res.data.data);
          if(res.data.data) {
            socket.connect();
          }
        })
        .catch(() => {
          setToken(null);
          localStorage.removeItem('apnabazar_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem('apnabazar_token', res.data.token);
    socket.connect();
    return res.data;
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem('apnabazar_token', res.data.token);
    socket.connect();
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('apnabazar_token');
    socket.disconnect();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
