import { Gear, SignOut, User } from '@/assets/Icons';
import Button from '@/components/Button';
import LanguangeSelect from '@/components/LanguangeSelect';
import ThemeModeToggle from '@/components/ThemeModeToggle';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';

const menuList = [
  {
    name: 'Profile',
    icon: <User className="size-6" />,
    link: '/profile',
  },
  {
    name: 'Settings',
    icon: <Gear className="size-6" />,
    link: '/settings',
  },
];

const Header = () => {
  const { logout, userInfo } = useAuthContext();
  const { t } = useLocalizeContext();
  return (
    <div className="flex w-full items-center justify-between bg-slate-700 p-4">
      <Link to="/" className="flex items-center gap-6">
        <img src="/assets/logos/logo.png" alt="Shopping List" className="w-20" />
        <p className="font-mono text-4xl">Shopping List</p>
      </Link>

      <div className="flex items-center">
        <ThemeModeToggle />
        <LanguangeSelect />
        <span className="mr-4 text-xl">
          {userInfo?.firstName}
          {' '}
          {userInfo?.lastName}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <label className="burger" htmlFor="burger">
              <input type="checkbox" id="burger" />
              <span />
              <span />
              <span />
            </label>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {menuList.map(e => (
              <DropdownMenuItem key={e.link} asChild className="cursor-pointer gap-2 text-xl">
                <Link to={e.link}>
                  {e.icon}
                  {t(e.name)}
                </Link>
              </DropdownMenuItem>
            )) }
            <DropdownMenuItem asChild onClick={logout} className="cursor-pointer">
              <div className="flex items-center gap-2 text-xl">
                <SignOut className="size-6" />
                {t('Logout')}
              </div>
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
