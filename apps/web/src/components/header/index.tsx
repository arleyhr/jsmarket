import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CartButton from '../buttons/cart';
import CartSidebar from '../cart/cart-sidebar';
import Logo from '../logo';
import SearchBar from '../search-bar';
import UserMenu from '../user-menu';

const products = [
  { id: '1', name: 'Product 1', price: 10, quantity: 1, image: 'https://placehold.co/600x400.png' },
  { id: '2', name: 'Product 2', price: 20, quantity: 2, image: 'https://placehold.co/600x400.png' },
  { id: '3', name: 'Product 3', price: 30, quantity: 3, image: 'https://placehold.co/600x400.png' },
  { id: '4', name: 'Product 4', price: 40, quantity: 4, image: 'https://placehold.co/600x400.png' },
];

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="w-full bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <Logo />
            <SearchBar onSearch={(query, category) => navigate(`/products?query=${query}&category=${category}`)} />
            <div className="flex space-x-6 justify-end">
              <UserMenu showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
              <CartButton
                count={3}
                onClick={() => {
                  setIsCartOpen(prev => !prev);
                }}
              />
            </div>
          </div>
        </div>
      </header>
      {isCartOpen && <CartSidebar products={products} />}
    </>
  );
};

export default Header;
