import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Auth from '@/constants/Auth';
import { useAuthContext } from '@/contexts/auth/AuthContext';

const PrivateRoute = () => {
  const { isInitialized, isAuthenticated } = useAuthContext();

  const redirectCheck = async () => {
    if (isInitialized && isAuthenticated != null && !isAuthenticated) {
      // Notification.error('Either your session expired or you are not properly authenticated. You will be redirected to login page.', 3000);
      window.location.replace(Auth.unauthorizedRedirectionPath);
    }
  };

  useEffect(() => {
    redirectCheck();
  }, [isInitialized, isAuthenticated]);

  return isInitialized && (
    (isAuthenticated != null && isAuthenticated && <Outlet />)
    || (isAuthenticated != null && !isAuthenticated && <div />)
  );
};

export default PrivateRoute;
