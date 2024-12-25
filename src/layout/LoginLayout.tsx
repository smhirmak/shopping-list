import Container from '@/components/Container';
import LanguangeSelect from '@/components/LanguangeSelect';
import ThemeModeToggle from '@/components/ThemeModeToggle';
import { Link, Outlet } from 'react-router-dom/dist';

const LoginLayout = () => (
  <Container className="flex min-h-screen flex-col py-2">
    <div className="mb-4 flex items-center justify-between border-b-2 py-4">
      <Link to="/" className="flex items-center gap-6">
        <img src="/assets/logos/logo.png" alt="Shopping List" className="w-12 md:w-20" />
        <p className="font-mono text-xl md:text-4xl">Shopping List</p>
      </Link>
      <div className="flex">
        <ThemeModeToggle />
        <LanguangeSelect />
      </div>
    </div>
    <div className="flex grow items-center justify-center">
      <Outlet />
    </div>
  </Container>
);

export default LoginLayout;
