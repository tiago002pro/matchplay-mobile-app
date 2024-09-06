import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from "../service/AuthService";
import { setAuthToken } from "../api/axiosInstance";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
}

interface AuthContextProps {
  authState: AuthState;
  doLogin: (login:string, password:string) => Promise<void>;
  doLogout: () => Promise<void>;
  getToken: () => any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { signIn } = AuthService();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userJson = await AsyncStorage.getItem('@RNAuth:user');
        const token = await AsyncStorage.getItem('@RNAuth:token');
        
        if (userJson && token) {
          setAuthState({
            isAuthenticated: true,
            user: JSON.parse(userJson),
            token: token,
          })
        }
      } catch (error) {
        console.error('Failed to check auth status', error);
      }
    };
    checkAuthStatus();
  }, [])

  async function doLogin(login:string, password:string) {
    try {
      const response = await signIn(login, password)
      setAuthState({
        isAuthenticated: true,
        user: response.user,
        token: response.token,
      })
      setAuthToken(response.token);
      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
      await AsyncStorage.setItem('@RNAuth:token', response.token);
    } catch (error) {
      console.error('Failed to login', error);
    }
  }

  async function doLogout() {
    try {
      await AsyncStorage.clear()
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      })
      setAuthToken(null);
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  function getToken() {
    return authState.token || null;
  };

  return (
    <AuthContext.Provider value={{ authState, doLogin, doLogout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};