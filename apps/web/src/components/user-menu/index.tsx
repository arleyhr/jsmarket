import { IconUserSquareRounded } from '@tabler/icons-react';

import MenuDropdown from '../menu-dropdown';

const items = [
  { label: 'My Account', value: 'my-account', disabled: true },
  { label: 'My Orders', value: 'my-orders' },
  { label: 'Settings', value: 'settings', disabled: true },
  { label: 'Logout', value: 'logout' },
];

type UserMenuProps = {
  showUserMenu: boolean;
  logout: () => void;
  setShowUserMenu: (show: boolean) => void;
};

const UserMenu = ({ showUserMenu, setShowUserMenu, logout }: UserMenuProps) => {
  return (
    <div className="relative w-5 h-5">
      <button
      className="text-white hover:text-gray-300"
      onClick={() => setShowUserMenu(!showUserMenu)}
    >
      <IconUserSquareRounded />
    </button>
    {showUserMenu && (
      <MenuDropdown
        items={items}
        onClose={() => setShowUserMenu(false)}
        onItemClick={value => {
          if (value === 'logout') {
            logout();
          }
          setShowUserMenu(false);
        }}
      />
    )}
    </div>
  );
};

export default UserMenu;
