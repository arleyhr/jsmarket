import { IconUserSquareRounded } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import MenuDropdown from '../menu-dropdown';

const items = [
  { label: 'My Account', value: 'my-account', disabled: true },
  { label: 'My Orders', value: 'my-orders' },
  { label: 'Admin Orders', value: 'admin-orders', admin: true },
  { label: 'Settings', value: 'settings', disabled: true },
  { label: 'Logout', value: 'logout' },
];

type UserMenuProps = {
  idAdmin: boolean;
  showUserMenu: boolean;
  logout: () => void;
  setShowUserMenu: (show: boolean) => void;
};

const UserMenu = ({ idAdmin, showUserMenu, setShowUserMenu, logout }: UserMenuProps) => {
  const navigate = useNavigate();

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
          items={items.filter(item => !item.admin || idAdmin)}
          onClose={() => setShowUserMenu(false)}
          onItemClick={value => {
            if (value === 'logout') {
              logout();
            }

            if (value === 'my-orders') {
              navigate('/orders');
            }

            if (value === 'admin-orders') {
              navigate('/orders-admin');
            }

            setShowUserMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default UserMenu;
