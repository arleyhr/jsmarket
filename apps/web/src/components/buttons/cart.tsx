import { IconShoppingCart } from "@tabler/icons-react";

type CartButtonProps = {
  count: number;
  onClick: () => void;
};

const CartButton = ({ count, onClick }: CartButtonProps) => (
  <button
    className="text-white hover:text-gray-300 relative"
    onClick={onClick}
  >
    <IconShoppingCart />
    <span className="absolute -top-2 -right-2 bg-yellow-500 text-xs text-gray-900 font-bold rounded-full h-5 w-5 p-1 flex items-center justify-center">
      {count}
    </span>
  </button>
);

export default CartButton;
