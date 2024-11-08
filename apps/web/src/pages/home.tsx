import WidgetOrderCard from "../components/widgets/widget-order-card";
import WidgetProductsHistory from "../components/widgets/widget-products-history";
import { useAddToCart } from "../hooks/useCart";
import { useOrders } from "../hooks/useOrders";
import { useStorageProductsViewed } from "../hooks/useStorageProductsViewed";


export default function HomePage() {
  const { viewedProducts } = useStorageProductsViewed();
  const { addToCart } = useAddToCart();
  const { orders } = useOrders();

  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      <WidgetOrderCard orders={orders} />
      <WidgetProductsHistory products={viewedProducts} onAddToCart={addToCart} />
    </div>
  );
}
