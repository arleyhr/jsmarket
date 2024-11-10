import { IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useCart, useCartSidebar, useRemoveFromCart, useUpdateCartItemQuantity } from '../../hooks/useCart';
import LineButton from '../buttons/line';
import CartTotal from '../cart/cart-total';

import ProductCard from './cart-side-product';

const CartSidebar = () => {
  const navigate = useNavigate();
  const { cart, loading } = useCart();
  const { removeFromCart } = useRemoveFromCart();
  const { updateCartItemQuantity } = useUpdateCartItemQuantity();
  const { closeSidebar } = useCartSidebar();

  const products = cart?.items
    ? [...cart.items].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];
  const total = products?.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="fixed right-0 top-0 h-full z-50 bg-white w-full md:w-36 border-l border-gray-300">
      <div className="p-2 border-t border-b bg-white mb-2 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => closeSidebar()}
        >
          <IconX size={16} />
        </button>
        <CartTotal total={total} />
        <LineButton
          text="Go to cart"
          onClick={() => {
            navigate('/cart');
          }}
        />
      </div>
      <div className="overflow-y-auto h-[calc(100%-180px)] px-4 md:px-2">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-0">
            {products.map((product, index) => (
              <div key={product.productId}>
                <ProductCard
                  productId={product.productId}
                  image={product.productImage}
                  name={product.productName}
                  price={product.price}
                  quantity={product.quantity}
                  onRemove={() => removeFromCart(product.productId)}
                  onQuantityChange={quantity => updateCartItemQuantity(product.productId, quantity)}
                />
                {index < products.length - 1 && <hr className="w-full border-gray-200 my-2 hidden md:block" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
