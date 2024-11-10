import WidgetOrderCard from '../components/widgets/widget-order-card';
import WidgetProductsHistory from '../components/widgets/widget-products-history';
import { useAddToCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import { useStorageProductsViewed } from '../hooks/useStorageProductsViewed';

export default function HomePage() {
  const { viewedProducts } = useStorageProductsViewed();
  const { addToCart } = useAddToCart();
  const { orders } = useOrders();

  return (
    <>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-blue-800">
          You are an <span className="font-bold">admin</span> user. You can manage all orders in the{' '}
          <a href="/orders-admin" className="text-blue-600 hover:text-blue-800 underline">
            Orders Administration Panel
          </a>
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <WidgetOrderCard orders={orders} />
        <WidgetProductsHistory products={viewedProducts} onAddToCart={addToCart} />
      </div>
    </>
  );
}
