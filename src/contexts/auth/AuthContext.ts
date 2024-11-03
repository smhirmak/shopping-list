import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

type UserInfo = {
  email: string;
  firstName: string;
  lastName: string;
};

export type AuthContextType = {
  isInitialized: boolean;
  isAuthenticated: boolean | null;
  userInfo: UserInfo | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
};
