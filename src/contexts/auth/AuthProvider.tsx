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
import Notification from '@/components/Notification';
import { doc, getDoc, setDoc, Timestamp, collection, getDocs } from 'firebase/firestore';
import { useLocalizeContext } from '../locale/LocalizeContext';
import { AuthContext } from './AuthContext';

export const jwtTimeCheckRef = createRef();

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userInfo, setUserInfo] = useState<object | undefined>(undefined);
  const [allUsersInfo, setAllUsersInfo] = useState<object[] | undefined>(undefined);
  const { t } = useLocalizeContext();

  interface LoginData {
    email: string;
    password: string;
  }
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
          const info = await getDoc(doc(db, 'users', user.uid));
          setUserInfo(info.data() || undefined);
        } catch (error) {
          console.error('Error setting document:', error);
        }
      }
    });
  };
  const getAllUsersInfo = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setAllUsersInfo(querySnapshot.docs.map(doc => doc.data()));
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const login = async (data: LoginData) => {
    try {
      const response = await signInWithEmailAndPassword(auth, data.email, data.password);
      if (response && response.user && response.user.uid) {
        if (!response.user.emailVerified) {
          sendEmailVerification(auth.currentUser).then(() => {
            Notification.success('Email doğrulama e-postası gönderildi. Oturum açabilmek için lütfen mail adresinizi doğrulayın.');
          }).catch(() => {
            Notification.error('Email doğrulama e-postası gönderilemedi.');
          });
        } else {
          Notification.success('Oturum açma başarılı!');
          setIsAuthenticated(true);
          setIsInitialized(true);
          getUserInfo();
          getAllUsersInfo();
          localStorage.setItem('token', response.user.uid);
          redirect('/');
        }
      } else {
        Notification.error('Oturum açma başarısız!');
      }
    } catch (error: any) {
      Notification.error(t(error.code.split('/').pop()));
    }
  };

  interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    uid: string;
    createDateTime: string;
  }

  const addUser = async (id: string, firstName: string, lastName: string, email: string): Promise<void> => {
    try {
      await setDoc(doc(db, 'users', id), {
        firstName,
        lastName,
        email,
        uid: id,
        createDateTime: Timestamp.now().toDate().toLocaleString(),
      } as UserData);
    } catch (error) {
      console.error('Error setting document:', error);
    }
  };

  const editUser = async (id: string, firstName: string, lastName: string): Promise<void> => {
    try {
      await setDoc(doc(db, 'users', id), {
        firstName,
        lastName,
      }, { merge: true });
    } catch (error) {
      Notification.error(t('Error setting document'));
      console.error('Error setting document:', error);
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
        Notification.success(t('Password updated successfully'));
      } else {
        Notification.error(t('User is not authenticated'));
      }
    } catch (error) {
      Notification.error(t(error.code.split('/').pop()));
      console.error('Error updating password:', error);
    }
  };

  const signUp = async (data: signUpData) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      if (response && response.user && response.user.uid) {
        Notification.success(t('Your account was successfully created!'));
        await sendEmailVerification(auth.currentUser);
        Notification.success(t('Mail verification email has been sent. Please verify your email address to be able to log in.'));

        if (auth.currentUser) {
          await addUser(response.user.uid, data.firstName, data.lastName, data.email);
        } else {
          Notification.error(t('User is not authenticated.'));
        }
        window.location.replace('/login');
      } else {
        Notification.error(t('Account creation failed!'));
      }
    } catch (error: any) {
      Notification.error(t(error.code.split('/').pop()));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email).then(() => {
        Notification.success('Şifre sıfırlama e-postası gönderildi.');
      }).catch(error => {
        console.error('Hata:', error);
        Notification.error('Şifre sıfırlama e-postası gönderilemedi.');
      });
    } catch (error: any) {
      Notification.error(t(error.code.split('/').pop()));
    }
  };

  const logout = () => {
    auth.signOut()
      .then(() => {
        localStorage.removeItem('token');
      })
      .catch(error => {
        Notification.error('Error during logout process!');
        console.log('logout', error);
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
        } catch (error) {
          console.error('Error fetching ID token:', error);
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
