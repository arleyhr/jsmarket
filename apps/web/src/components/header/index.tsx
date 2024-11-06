import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useCart} from '../../hooks/useCart';
import { useLoginModal } from '../../hooks/useLoginModal';
import CartButton from '../buttons/cart';
import CartSidebar from '../cart/cart-sidebar';
import Logo from '../logo';
import SearchBar from '../search-bar';
import UserMenu from '../user-menu';


const Header = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { openModal } = useLoginModal();
  const { cart, loading } = useCart();

  const prevAuthActions = (action: () => void) => {
    if (!isAuthenticated) {
      openModal();
      return;
    }
    action();
  };

  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
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
                <span className="text-sm font-medium">
                  {user.firstName}
                </span>
              )}
              <UserMenu
                showUserMenu={showUserMenu}
                setShowUserMenu={value => {
                  prevAuthActions(() => setShowUserMenu(value));
                }}
                logout={logout}
              />
              <CartButton
                count={cartCount}
                onClick={() => {
                  prevAuthActions(() => setIsCartOpen(prev => !prev));
                }}
              />
            </div>
          </div>
        </div>
      </header>
      {isCartOpen && <CartSidebar isLoading={loading} products={cart.items} />}
    </>
  );
};

export default Header;
