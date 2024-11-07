import WidgetOrderCard from "../components/widgets/widget-order-card";
import { Order } from "../components/widgets/widget-order-item";
import WidgetProductsHistory from "../components/widgets/widget-products-history";
import { useAddToCart } from "../hooks/useCart";
import { useStorageProductsViewed } from "../hooks/useStorageProductsViewed";

const orders = [
  {
    id: '1',
    productName: 'Product 1',
    image: 'https://placehold.co/600x400.png',
    status: 'delivered',
    deliveryDate: '2021-01-01',
  },
  {
    id: '2',
    productName: 'Product 2',
    image: 'https://placehold.co/600x400.png',
    status: 'in-transit',
    deliveryDate: '2021-01-01',
  },
  {
    id: '3',
    productName: 'Product 3',
    image: 'https://placehold.co/600x400.png',
    status: 'processing',
    deliveryDate: '2021-01-01',
  },
] as Order[];

export default function HomePage() {
  const { viewedProducts } = useStorageProductsViewed();
  const { addToCart } = useAddToCart();

  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      <WidgetOrderCard orders={orders} />
      <WidgetProductsHistory products={viewedProducts} onAddToCart={addToCart} />
    </div>
  );
}
