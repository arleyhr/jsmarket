import { useState } from "react";

import CartButton from "../buttons/cart";
import Logo from "../logo";
import SearchBar from "../search-bar";
import UserMenu from "../user-menu";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="w-full bg-zinc-900 text-white">
    <div className="max-w-7xl mx-auto px-4 py-2">
      <div className="flex items-center justify-between">
        <Logo />
        <SearchBar />
        <div className="flex space-x-6 justify-end">
          <UserMenu showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
          <CartButton count={3} onClick={() => {
            console.log('clicked');
          }} />
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
