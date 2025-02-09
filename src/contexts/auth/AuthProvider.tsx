/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import React, { createRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useState } from 'react';
import { redirect } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';
import { auth, db } from '@/configurations/firebase';
import { doc, getDoc, setDoc, Timestamp, collection, getDocs } from 'firebase/firestore';
import { UserData } from '@/types/types';
import Notification from '@/components/Notification';
import { useLocalizeContext } from '../locale/LocalizeContext';
import { AuthContext, UserInfo } from './AuthContext';

export const jwtTimeCheckRef = createRef();

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [allUsersInfo, setAllUsersInfo] = useState<UserInfo[] | null>(null);
  const { t } = useLocalizeContext();
  const { success, error } = Notification();
  interface signUpData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  const getUserInfo = async () => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const userInfos = await getDoc(doc(db, 'users', user.uid));
          setUserInfo(userInfos.data() as UserInfo || null);
        } catch (catchError) {
          console.error('Error setting document:', catchError);
        }
      }
    });
  };
  const getAllUsersInfo = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setAllUsersInfo(querySnapshot.docs.map(docItem => docItem.data() as UserInfo));
    } catch (catchError) {
      console.error('Error fetching documents:', catchError);
    }
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response && response.user && response.user.uid) {
        if (!response.user.emailVerified && auth.currentUser) {
          sendEmailVerification(auth.currentUser).then(() => {
            success('Email doğrulama e-postası gönderildi. Oturum açabilmek için lütfen mail adresinizi doğrulayın.');
          }).catch(() => {
            error('Email doğrulama e-postası gönderilemedi.');
          });
        } else {
          success('Oturum açma başarılı!');
          setIsAuthenticated(true);
          setIsInitialized(true);
          getUserInfo();
          getAllUsersInfo();
          localStorage.setItem('token', response.user.uid);
          redirect('/');
        }
      } else {
        error('Oturum açma başarısız!');
      }
    } catch (catchError: any) {
      console.log(t(catchError.code.split('/').pop()));
      if (catchError instanceof Error) {
        error(t((catchError as any).code.split('/').pop()));
      } else {
        error(t('An unknown error occurred'));
      }
    }
  };

  const addUser = async (id: string, firstName: string, lastName: string, email: string): Promise<void> => {
    try {
      await setDoc(doc(db, 'users', id), {
        firstName,
        lastName,
        email,
        uid: id,
        includingHouse: null,
        createDateTime: Timestamp.now().toDate().toLocaleString(),
      } as UserData);
    } catch (catchError) {
      console.error('Error setting document:', catchError);
    }
  };

  const editUser = async (id: string, firstName: string, lastName: string, includingHouse: string): Promise<void> => {
    try {
      await setDoc(doc(db, 'users', id), {
        firstName,
        lastName,
        includingHouse,
      }, { merge: true });
    } catch (catchError) {
      error(t('Error setting document'));
      console.error('Error setting document:', catchError);
    }
  };

  const updateUserPassword = async (email: string, currentPassword: string, newPassword: string): Promise<void> => {
    try {
      // debugger;
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        getUserInfo();
        success(t('Password updated successfully'));
      } else {
        error(t('User is not authenticated'));
      }
    } catch (catchError) {
      if (catchError instanceof Error && 'code' in catchError) {
        error(t((catchError as any).code.split('/').pop()));
      } else {
        error(t('An unknown error occurred'));
      }
      console.error('Error updating password:', catchError);
    }
  };

  const signUp = async (data: signUpData) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      if (response && response.user && response.user.uid && auth.currentUser) {
        success(t('Your account was successfully created!'));
        await sendEmailVerification(auth.currentUser);
        success(t('Mail verification email has been sent. Please verify your email address to be able to log in.'));

        if (auth.currentUser) {
          await addUser(response.user.uid, data.firstName, data.lastName, data.email);
        } else {
          error(t('User is not authenticated.'));
        }
        window.location.replace('/login');
      } else {
        error(t('Account creation failed!'));
      }
    } catch (catchError: any) {
      error(t(catchError.code.split('/').pop()));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      success('Şifre sıfırlama e-postası gönderildi.');
      return true;
    } catch (catchError: any) {
      console.error('Hata:', catchError);
      error(t(catchError.code.split('/').pop()));
      return false;
    }
  };

  const logout = () => {
    auth.signOut()
      .then(() => {
        localStorage.removeItem('token');
      })
      .catch(catchError => {
        error('Error during logout process!');
        console.log('logout', catchError);
      });
  };

  useImperativeHandle(jwtTimeCheckRef, () => ({ logout }));

  const verifyToken = () => {
    auth.onAuthStateChanged(async user => {
      if (user && user?.emailVerified) {
        try {
          const idToken = await user.getIdToken();
          localStorage.setItem('token', idToken);
          getUserInfo();
          getAllUsersInfo();
          setIsAuthenticated(true);
          setIsInitialized(true);
        } catch (catchError) {
          console.error('Error fetching ID token:', catchError);
        }
      } else {
        setIsAuthenticated(false);
        setIsInitialized(true);
      }
    });
  };

  useLayoutEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated != null) {
      setIsInitialized(true);
    } else if (isAuthenticated === false) {
      setIsInitialized(true);
    }
  }, [isAuthenticated]);

  const values = useMemo(
    () => ({
      isInitialized,
      isAuthenticated,
      userInfo,
      allUsersInfo,
      login,
      signUp,
      logout,
      resetPassword,
      editUser,
      getUserInfo,
      updateUserPassword,
    }),
    [isInitialized, isAuthenticated, userInfo, allUsersInfo],
  );

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
