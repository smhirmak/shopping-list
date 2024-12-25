import { Outlet } from 'react-router-dom/dist';
import Header from './Header';

const Layout = () => (
  <div className="min-w-screen flex min-h-screen flex-col">
    <Header />
    <div className="mt-4 grow pl-2">
      <Outlet />
    </div>
  </div>
);

export default Layout;
