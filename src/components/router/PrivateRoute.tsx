import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';
import LoadingSpinner from '../ui/loading-spinner';

const PrivateRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isInitialized = useAuthStore(state => state.isInitialized);

  if (!isInitialized) {
    return <div className="h-screen w-screen"><div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><LoadingSpinner className="" /></div></div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
