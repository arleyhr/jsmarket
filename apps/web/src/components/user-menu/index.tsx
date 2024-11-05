import { IconUserSquareRounded } from '@tabler/icons-react';

import MenuDropdown from '../menu-dropdown';

const items = [
  { label: 'My Account', value: 'my-account' },
  { label: 'My Orders', value: 'my-orders' },
  { label: 'Settings', value: 'settings' },
  { label: 'Logout', value: 'logout' },
];

type UserMenuProps = {
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
};

const UserMenu = ({ showUserMenu, setShowUserMenu }: UserMenuProps) => (
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
          console.log(value);
        }}
      />
    )}
  </div>
);

export default UserMenu;
