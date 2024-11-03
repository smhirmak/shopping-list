import { Outlet } from 'react-router-dom';

const ErrorsLayout = () => (
  <div className="h-screen w-screen bg-[url(/assets/images/backgrounds/error-pages-bg-image.png)] bg-cover bg-no-repeat">
    <div className="flex h-full items-center justify-center text-center">
      <div>
        <Outlet />
      </div>
    </div>
  </div>
);
export default ErrorsLayout;
