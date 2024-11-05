import LineButton from '../buttons/line';
import CartTotal from '../cart/cart-total';

import ProductCard from './cart-side-product';


export type CartProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartSidebarProps = {
  products: CartProduct[];
  onRemoveProduct?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
};

const CartSidebar = ({ products = [], onRemoveProduct, onUpdateQuantity }: CartSidebarProps) => {
  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="fixed right-0 top-0 h-full z-50 bg-white w-36 border-l border-gray-300">
      <div className="p-2 border-t border-b bg-white mb-2">
        <CartTotal total={total} />
        <LineButton
          text="Go to cart"
          onClick={() => {
            console.log('');
          }}
        />
      </div>
      <div className="overflow-y-auto h-[calc(100%-180px)]">
        {products.map((product, index) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              onRemove={() => onRemoveProduct?.(product.id)}
              onQuantityChange={quantity => onUpdateQuantity?.(product.id, quantity)}
            />
            {index < products.length - 1 && <hr className="w-full border-gray-200 my-2" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartSidebar;
