import { createContext, useContext } from 'react';

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  uid: string
}
interface AuthContextType {
  userInfo: UserInfo | null;
  isInitialized: boolean;
  isAuthenticated: boolean | null;
  login: ({ email, password }: {email: string, password: string}) => Promise<void>;
  signUp: ({ email, password, firstName, lastName }: {email: string, password: string, firstName: string, lastName: string}) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  updateUserPassword: (email: string, currentPassword: string, newPassword: string) => Promise<void>;
  editUser: (uid: string, firstName: string, lastName: string) => Promise<void>;
  getUserInfo: () => Promise<void>;
  allUsersInfo: UserInfo[] | null;
}

const defaultAuthContext: AuthContextType = {
  userInfo: null,
  isInitialized: false,
  isAuthenticated: null,
  login: async () => {},
  signUp: async () => {},
  logout: () => {},
  resetPassword: async () => false,
  updateUserPassword: async () => {},
  editUser: async () => {},
  getUserInfo: async () => {},
  allUsersInfo: null,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuthContext = () => useContext(AuthContext);
