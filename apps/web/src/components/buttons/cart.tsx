import { IconShoppingCart } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

type CartButtonProps = {
  count: number;
  onClick: () => void;
};

const CartButton = ({ count, onClick }: CartButtonProps) => {
  const countItem = (
    <span className="absolute -top-2 -right-2 bg-yellow-500 text-xs text-gray-900 font-bold rounded-full h-5 w-5 p-1 flex items-center justify-center">
      {count}
    </span>
  );

  return (
    <>
      <button className="hidden md:block text-white hover:text-gray-300 relative" onClick={onClick}>
        <IconShoppingCart />
        {countItem}
      </button>
      <Link to="/cart" className="md:hidden">
        <button className="text-white hover:text-gray-300 relative md:hidden">
          <IconShoppingCart />
          {countItem}
        </button>
      </Link>
    </>
  );
};

export default CartButton;
