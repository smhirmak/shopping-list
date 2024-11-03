import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Auth from '@/constants/Auth';
import { useAuthContext } from '../../contexts/auth/AuthContext';

const PublicRoute = () => {
  const { isInitialized, isAuthenticated } = useAuthContext();

  const redirectCheck = async () => {
    if (isInitialized && isAuthenticated != null && isAuthenticated) {
      window.location.replace(Auth.authorizedRedirectionPath);
    }
  };

  useEffect(() => {
    redirectCheck();
  }, [isInitialized, isAuthenticated]);

  return isInitialized && ((
  // eslint-disable-next-line react/jsx-props-no-spreading
    isAuthenticated != null && !isAuthenticated && <Outlet />
  )
  || (isAuthenticated != null && isAuthenticated
    && <div />));
};

export default PublicRoute;
