import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import Home from './pages/Home';
import BackToTopButton from './components/BackToTopButton';
import PrivateRoute from './components/router/PrivateRoute';
import ErrorsPage from './pages/errors/ErrorsPage';
import PublicRoute from './components/router/PublicRoute';
import Login from './pages/Account/Login';
import AuthProvider from './contexts/auth/AuthProvider';
import LoginLayout from './layout/LoginLayout';
import ResetPassword from './pages/Account/ResetPassword';
import SignUp from './pages/Account/SignUp';

const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    errorElement: <ErrorsPage />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '',
            element: <Home />,
          }],
      },
    ],
  },
  {
    element: <PublicRoute />,
    errorElement: <ErrorsPage />,
    children: [
      {
        path: '',
        element: <LoginLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'sign-up',
            element: <SignUp />,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },
]);

const App = () => (
  <div>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer newestOnTop toastClassName="rounded-lg" bodyStyle={{ fontSize: '.9rem' }} theme="colored" />
      <BackToTopButton />
    </AuthProvider>
  </div>
);

export default App;
