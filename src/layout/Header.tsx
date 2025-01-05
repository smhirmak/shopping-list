import { Gear, SignOut, User } from '@/assets/Icons';
import LanguangeSelect from '@/components/LanguangeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import ThemeModeToggle from '@/components/ThemeModeToggle';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { useState } from 'react';
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
  const { logout, userInfo, isAuthenticated } = useAuthContext();
  const { t } = useLocalizeContext();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex w-full items-center justify-between bg-tra-neutral p-2 md:p-4">
      <Link to="/" className="flex items-center gap-2 md:gap-6">
        <img src="/assets/logos/logo.png" alt="Shopping List" className="w-12 md:w-20" />
        <p className="font-mono text-xl md:text-4xl">Shopping List</p>
      </Link>
      <div className="flex items-center">
        <ThemeModeToggle />
        <LanguangeSelect />
        {isAuthenticated && (
          <>
            <span className="mr-4 hidden text-xl md:block">
              {userInfo?.firstName}
              {' '}
              {userInfo?.lastName}
            </span>
            <Popover dropdownAlign="right" open={showMenu} onOpenChange={setShowMenu}>
              <PopoverTrigger>
                <label className="burger" data-state={showMenu ? 'open' : 'closed'} htmlFor="burger">
                  <input type="checkbox" id="burger" />
                  <span />
                  <span />
                  <span />
                </label>
              </PopoverTrigger>
              <PopoverContent
                className="shadow-soft-grey max-h-80 min-h-12 w-fit min-w-max max-w-full overflow-auto rounded-md bg-tra-background px-2 py-4"
              >
                {menuList.map(e => (
                  <div key={e.link} className="mb-2 cursor-pointer rounded-md p-2 text-xl hover:bg-tra-primary-15">
                    <Link to={e.link} onClick={() => setShowMenu(false)} className="flex items-center gap-2">
                      {e.icon}
                      {t(e.name)}
                    </Link>
                  </div>
                ))}
                <div onClick={() => { logout(); setShowMenu(false); }} className="cursor-pointer rounded-md p-2 hover:bg-tra-primary-15">
                  <div className="flex items-center gap-2 text-xl">
                    <SignOut className="size-6" />
                    {t('Logout')}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
