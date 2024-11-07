import { useNavigate } from 'react-router-dom';

import CartCheckoutCard from '../components/cart/cart-checkout-card';
import LoadingBlock from '../components/loading/loading-block';
import {
  useCart,
  useCheckoutCart,
  useRemoveFromCart,
  useUpdateCartItemQuantity,
} from '../hooks/useCart';

interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, loading } = useCart();
  const { checkoutCart, loading: checkoutCartLoading } = useCheckoutCart();

  const { removeFromCart, loading: removeFromCartLoading } = useRemoveFromCart();
  const { updateCartItemQuantity, loading: updateCartItemQuantityLoading } =
    useUpdateCartItemQuantity();

  const someOperationLoading =
    removeFromCartLoading || updateCartItemQuantityLoading || checkoutCartLoading;

  const addItemQuantity = (productId: number) => updateCartItemQuantity(productId, 1, 'add');
  const subtractItemQuantity = (productId: number) =>
    updateCartItemQuantity(productId, 1, 'subtract');

  const items = cart?.items || [];
  const total = cart?.total || 0;

  const handleCheckout = async () => {
    await checkoutCart();
    navigate('/orders');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {loading && <LoadingBlock />}

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item: CartItem) => (
              <CartCheckoutCard
                key={item.productId}
                isLoading={someOperationLoading}
                removeFromCart={() => removeFromCart(item.productId)}
                addItemQuantity={() => addItemQuantity(item.productId)}
                subtractItemQuantity={() => subtractItemQuantity(item.productId)}
                {...item}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal ({items.length} items)</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={someOperationLoading}
                className={`w-full mt-4 py-2 px-4 rounded ${
                  someOperationLoading
                    ? 'bg-gray-400 text-gray-700'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
