import { Link } from 'react-router-dom';

import { useRemoveFromCart, useUpdateCartItemQuantity } from '../../hooks/useCart';

import RemoveButton from './cart-remove';

interface CartCheckoutCardProps {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  isLoading: boolean;
  removeFromCart: () => void;
  addItemQuantity: () => void;
  subtractItemQuantity: () => void;
}

export default function CartCheckoutCard({
  productId,
  productName,
  productImage,
  price,
  quantity,
  isLoading,
  removeFromCart,
  addItemQuantity,
  subtractItemQuantity,
}: CartCheckoutCardProps) {
  return (
    <div className={`flex border-b py-4 ${isLoading ? 'opacity-50 transition-opacity duration-300' : ''}`}>
      <div className="w-24 h-24 flex-shrink-0">
        <img src={productImage} alt={productName} className="w-full h-full object-cover" />
      </div>
      <div className="ml-4 flex-grow">
        <Link to={`/products/${productId}`}>
          <h3 className="font-medium">{productName}</h3>
        </Link>
        <p className="text-yellow-600 font-medium">${price}</p>
        <div className="mt-2 flex items-center">
          <button
            onClick={subtractItemQuantity}
            className="border px-2 py-1"
            disabled={isLoading}
          >
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            onClick={addItemQuantity}
            className="border px-2 py-1"
            disabled={isLoading}
          >
            +
          </button>
        </div>
      </div>
      <div className="ml-4">
        <RemoveButton onClick={removeFromCart} disabled={isLoading} />
      </div>
    </div>
  );
};
