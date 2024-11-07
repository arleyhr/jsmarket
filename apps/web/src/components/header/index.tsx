import { UserRole } from '@jsmarket/state-machines';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useCart, useCartSidebar } from '../../hooks/useCart';
import { useLoginModal } from '../../hooks/useLoginModal';
import CartButton from '../buttons/cart';
import Logo from '../logo';
import SearchBar from '../search-bar';
import UserMenu from '../user-menu';

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { openModal } = useLoginModal();
  const { isSidebarOpen, openSidebar, closeSidebar } = useCartSidebar();
  const { cart } = useCart();

  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const prevAuthActions = (action: () => void) => {
    if (!isAuthenticated) {
      openModal();
      return;
    }
    action();
  };

  return (
    <header className="w-full bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <SearchBar
            onSearch={(query, category) => {
              navigate({
                pathname: '/products',
                search: `?${new URLSearchParams({
                  query: query || '',
                  category: category || '',
                })}`,
              });
            }}
          />
          <div className="flex space-x-6 justify-end">
            {isAuthenticated && user?.firstName && (
              <span className="text-sm font-medium">{user.firstName}</span>
            )}
            <UserMenu
              idAdmin={user?.role === UserRole.ADMIN}
              showUserMenu={showUserMenu}
              setShowUserMenu={value => {
                prevAuthActions(() => setShowUserMenu(value));
              }}
              logout={logout}
            />
            <CartButton
              count={cartCount}
              onClick={() => {
                prevAuthActions(() => {
                  if (isSidebarOpen) {
                    closeSidebar();
                  } else {
                    openSidebar();
                  }
                });
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
