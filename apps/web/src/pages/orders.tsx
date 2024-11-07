import { OrderStatus } from '@jsmarket/state-machines';

import LoadingBlock from '../components/loading/loading-block';
import OrderList from '../components/orders/orders-user-list';
import { useOrders } from '../hooks/useOrders';

export const statusColors = {
  [OrderStatus.Pending]: 'bg-yellow-100 text-yellow-800',
  [OrderStatus.Review]: 'bg-orange-100 text-orange-800',
  [OrderStatus.StartPreparation]: 'bg-yellow-100 text-yellow-800',
  [OrderStatus.Shipped]: 'bg-purple-100 text-purple-800',
  [OrderStatus.Delivered]: 'bg-green-100 text-green-800',
  [OrderStatus.Canceled]: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const { orders, loading } = useOrders();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {loading && <LoadingBlock />}

      <OrderList orders={orders} />
    </div>
  );
}
