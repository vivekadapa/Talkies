import React, { createContext, useContext, useEffect, useState } from 'react';
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
  const token = localStorage.getItem("jwt_token");

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
          navigate('/login')
        }
      }
      else {
        navigate('/login')
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
    localStorage.removeItem("jwt_token")
    setUser(null);
  };



  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}