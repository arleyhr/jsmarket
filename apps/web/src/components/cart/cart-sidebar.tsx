import { useNavigate } from 'react-router-dom';

import { useCart, useRemoveFromCart, useUpdateCartItemQuantity } from '../../hooks/useCart';
import LineButton from '../buttons/line';
import CartTotal from '../cart/cart-total';

import ProductCard from './cart-side-product';

const CartSidebar = () => {
  const navigate = useNavigate();
  const { cart, loading } = useCart();
  const { removeFromCart } = useRemoveFromCart();
  const { updateCartItemQuantity } = useUpdateCartItemQuantity();

  const products = cart?.items
    ? [...cart.items].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];
  const total = products?.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="fixed right-0 top-0 h-full z-50 bg-white w-36 border-l border-gray-300">
      <div className="p-2 border-t border-b bg-white mb-2">
        <CartTotal total={total} />
        <LineButton
          text="Go to cart"
          onClick={() => {
            navigate('/cart');
          }}
        />
      </div>
      <div className="overflow-y-auto h-[calc(100%-180px)]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          products.map((product, index) => (
            <div key={product.productId}>
              <ProductCard
                image={product.productImage}
                name={product.productName}
                price={product.price}
                quantity={product.quantity}
                onRemove={() => removeFromCart(product.productId)}
                onQuantityChange={quantity => updateCartItemQuantity(product.productId, quantity)}
              />
              {index < products.length - 1 && <hr className="w-full border-gray-200 my-2" />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
