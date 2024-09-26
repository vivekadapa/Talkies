import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()
  // const token = cookies.get("TOKEN");
  const token = localStorage.getItem("jwt_token");
  if (!token) {
    navigate('/login')
  }
  // const localstorage = new localStorage();
  useEffect(() => {
    const checkAuthentication = async () => {
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getuser`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data.user);
          setLoading(false);
        } catch (error) {
          console.log("Authentication Failed");
          setLoading(false);
        }
      }
      else {
        setLoading(false);
      }
    }

    checkAuthentication();
  }, [token])


  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("jwt_token", response.data.token)
      setUser(response.data.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  const logout = () => {
    // cookies.remove('TOKEN', { path: '/' });
    localStorage.removeItem("jwt_token")
    setUser(null);
  };



  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}