/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, db } from '@/configurations/firebase';
import { SignUpDRequest, UserData, UserInfo } from '@/types/types';
import { createUserWithEmailAndPassword, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, Timestamp } from 'firebase/firestore';
import { createRef } from 'react';
import { create } from 'zustand';

export const jwtTimeCheckRef = createRef();

interface AuthStore {
  userInfo: UserInfo | null
  allUsersInfo: UserInfo[] | null
  isAuthenticated: boolean | null
  isInitialized?: boolean
  getUserInfo: () => void
  getAllUsersInfo: () => Promise<void>
  login: ({ email, password }: { email: string; password: string }) => Promise<{ status: string; code?: string }>
  logout: () => Promise<{ status: string; code?: string }>
  verifyToken: () => () => void
  changeInitialized: (value: boolean) => void
  updateUserPassword: (email: string, currentPassword: string, newPassword: string) => Promise<{ status: string; message?: string }>
  addUser: (id: string, firstName: string, lastName: string, email: string) => Promise<{ state: string, message: string }>
  signUp: (data: SignUpDRequest) => Promise<{ status: string; messages?: string[] }>
  editUser: (id: string, firstName: string, lastName: string, includingHouse: string) => Promise<{ status: string; messages: string }>
  resetPassword: (email: string) => Promise<{ status: string; message?: string }>
}

const useAuthStore = create<AuthStore>((set, get) => ({
  userInfo: null,
  allUsersInfo: null,
  isAuthenticated: null,
  isInitialized: false,

  getUserInfo: async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          set({ userInfo: userDoc.data() as UserInfo });
        }
      } catch (catchError) {
        console.error('Error getting user info:', catchError);
      }
    }
  },

  getAllUsersInfo: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      set({ allUsersInfo: querySnapshot.docs.map(docItem => docItem.data() as UserInfo) });
    } catch (catchError) {
      console.error('Error fetching all users:', catchError);
    }
  },

  login: async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { user } = response;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        return { status: 'verification-sent' };
      }

      set({ isAuthenticated: true });
      await get().getUserInfo();
      await get().getAllUsersInfo();
      localStorage.setItem('token', user.uid);

      return { status: 'success' };
    } catch (catchError: any) {
      console.error('Login error:', catchError);
      return { status: 'error', code: catchError.code || 'unknown-error' };
    }
  },

  logout: async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('token');
      set({ isAuthenticated: false, userInfo: null });
      return { status: 'success' };
    } catch (catchError: any) {
      console.log('logout', catchError);
      return { status: 'error', code: catchError.code || 'unknown-error' };
    }
  },

  verifyToken: () => onAuthStateChanged(auth, async user => {
    if (user && user?.emailVerified) {
      const idToken = await user.getIdToken();
      localStorage.setItem('token', idToken);
      set({ isAuthenticated: true, isInitialized: true });
      get().getUserInfo();
      get().getAllUsersInfo();
    } else {
      set({ isAuthenticated: false, isInitialized: true, userInfo: null });
    }
  }),

  changeInitialized: (value: boolean) => {
    set({ isInitialized: value });
  },

  updateUserPassword: async (email: string, currentPassword: string, newPassword: string): Promise<{ status: string, message?: string }> => {
    try {
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        await get().getUserInfo();
        return { status: 'success', message: 'Password updated successfully' };
      }
      return { status: 'error', message: 'User is not authenticated' };
    } catch (catchError) {
      if (catchError instanceof Error && 'code' in catchError) {
        return { status: 'error', message: (catchError as any).code.split('/').pop() };
      }
      console.error('Error updating password:', catchError);
      return { status: 'error', message: 'An unknown error occurred' };
    }
  },

  addUser: async (id: string, firstName: string, lastName: string, email: string): Promise<{ state: string, message: string }> => {
    try {
      await setDoc(doc(db, 'users', id), {
        firstName,
        lastName,
        email,
        uid: id,
        includingHouse: null,
        createDateTime: Timestamp.now().toDate().toLocaleString(),
      } as UserData);
      return { state: 'success', message: 'User added successfully' };
    } catch (catchError) {
      console.error('Error setting document:', catchError);
      return { state: 'error', message: 'Error adding user' };
    }
  },

  signUp: async (data: SignUpDRequest) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      if (response && response.user && response.user.uid && auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        if (auth.currentUser) {
          await get().addUser(response.user.uid, data.firstName, data.lastName, data.email);
        } else {
          return { status: 'error', messages: ['User authentication failed after account creation.'] };
        }
        return { status: 'success', messages: ['Your account was successfully created!', 'Mail verification email has been sent. Please verify your email address to be able to log in.'] };
      } else {
        return { status: 'error', messages: ['Account creation failed. Please try again.'] };
      }
    } catch (catchError: any) {
      return { status: 'error', messages: [catchError.code.split('/').pop()] };
    }
  },

  editUser: async (id: string, firstName: string, lastName: string, includingHouse: string): Promise<{ status: string, messages: string }> => {
    try {
      await setDoc(doc(db, 'users', id), {
        firstName,
        lastName,
        includingHouse,
      }, { merge: true });
      return { status: 'success', messages: 'User information updated successfully.' };
    } catch (catchError) {
      console.error('Error setting document:', catchError);
      return { status: 'error', messages: 'Error updating user information.' };
    }
  },

  resetPassword: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { status: 'success', message: 'Şifre sıfırlama e-postası gönderildi.' };
    } catch (catchError: any) {
      console.error('Hata:', catchError);
      return { status: 'error', message: catchError.code.split('/').pop() };
    }
  },


}));

export default useAuthStore;
