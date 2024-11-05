import WidgetOrderCard from "../components/widgets/widget-order-card";
import { Order } from "../components/widgets/widget-order-item";
import WidgetProductsHistory from "../components/widgets/widget-products-history";

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

const products = [
  {
    id: 1,
    name: 'Premium Noise Cancelling Bluetooth Headphones with High-Fidelity Sound',
    price: '$129.99',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 2,
    name: 'Waterproof Sports Smartwatch with Heart Rate Monitor',
    price: '$199.99',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 3,
    name: '4K Mirrorless Digital Camera with Interchangeable Lens',
    price: '$899.99',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 4,
    name: 'Professional Ultra-High-Definition 8K Smart Television with Quantum Dot Technology, Dolby Atmos Sound System, and Advanced Gaming Features for the Ultimate Home Entertainment Experience',
    price: '$2,499.99',
    image: 'https://placehold.co/600x400.png',
  },
];


export default function HomePage() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      <WidgetOrderCard orders={orders} />
      <WidgetOrderCard orders={[]} />
      <WidgetProductsHistory products={products} />
      <WidgetProductsHistory products={[]} />
    </div>
  );
}
