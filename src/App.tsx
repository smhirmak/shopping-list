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
import ProductProvider from './contexts/product/ProductProvider';
// import { PopupProvider } from './components/Alert';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import GoShopping from './pages/GoShopping';

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
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          {
            path: 'go-shopping',
            element: <GoShopping />,
          },
        ],
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
      <ProductProvider>
        <RouterProvider router={router} />
        <ToastContainer newestOnTop toastClassName="rounded-lg" bodyStyle={{ fontSize: '.9rem' }} theme="colored" />
        {/* <PopupProvider /> */}
        <BackToTopButton />
      </ProductProvider>
    </AuthProvider>
  </div>
);

export default App;
