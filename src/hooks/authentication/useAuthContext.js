'use client';
import { createContext, useContext } from 'react';
import { useAuth } from '@hooks/authentication/useAuth';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
