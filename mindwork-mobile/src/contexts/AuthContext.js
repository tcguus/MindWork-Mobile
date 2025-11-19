import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userJson = await AsyncStorage.getItem('userData');
      
      if (token && userJson) {
        setAuthData({ token, user: JSON.parse(userJson) });
      }
    } catch (error) {
      console.log("Erro ao carregar dados", error);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, fullName, role } = response.data;

      const userData = { fullName, role };
      
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      setAuthData({ token, user: userData });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Falha ao entrar." 
      };
    }
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);