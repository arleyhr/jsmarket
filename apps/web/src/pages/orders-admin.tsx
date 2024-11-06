import { useState } from 'react';

import TabButton from '../components/buttons/tab';
import OrderAdminCard from '../components/orders/order-admin-card';
import OrderDetailModal from '../components/orders/order-detail-modal';
import OrderLogItem from '../components/orders/order-log-item';

import { Order, orders, orderStatusLogs } from './orders';

const OrderFilters = () => (
  <div className="flex flex-wrap items-center justify-end gap-4 mb-8">
    <select className="min-w-[200px] rounded-md border border-gray-300 py-2 px-4 text-gray-600 focus:border-yellow-500 focus:ring-yellow-500 hover:border-gray-400">
      <option value="">Order Status</option>
      <option value="pending">Pending</option>
      <option value="review">In Review</option>
      <option value="preparation">In Preparation</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
    </select>

    <input
      type="text"
      className="min-w-[200px] rounded-md border border-gray-300 py-2 px-4 text-gray-600 placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500 hover:border-gray-400"
      placeholder="Search by Order ID"
    />
  </div>
);

function getNextStatus(status: string) {
  switch (status) {
    case 'pending':
      return 'review';
    case 'review':
      return 'preparation';
    case 'preparation':
      return 'shipped';
    case 'shipped':
      return 'delivered';
    default:
      return null;
  }
}

export default function OrdersAdmin() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentTab, setCurrentTab] = useState<'orders' | 'statusHistory'>('orders');
  const handleStatusChange = (orderId: number) => {
    console.log(`Changing status for order ${orderId}`);
  };

  const handleCancel = (orderId: number) => {
    console.log(`Cancelling order ${orderId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Orders Administration Panel</h1>

      <div className="border-b">
        <nav className="flex justify-center space-x-8 -mb-px">
          <TabButton
            isActive={currentTab === 'orders'}
            label="Orders"
            onClick={() => setCurrentTab('orders')}
          />
          <TabButton
            isActive={currentTab === 'statusHistory'}
            label="Status History"
            onClick={() => setCurrentTab('statusHistory')}
          />
        </nav>
      </div>

      {currentTab === 'orders' && (
        <div className="p-6">
          <OrderFilters />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(order => (
              <OrderAdminCard
                key={order.id}
                orderId={order.id}
                status={order.status}
                total={order.total}
                onChangeStatus={handleStatusChange}
                onViewDetails={() => setSelectedOrder(order)}
                onCancel={() => handleCancel(order.id)}
                createdAt={order.createdAt}
                customerName={`${order.user.firstName} ${order.user.lastName}`}
                latestComment={order.statusHistory[order.statusHistory.length - 1]?.comment}
                nextStatus={getNextStatus(order.status)!}
              />
            ))}
          </div>
        </div>
      )}

      {currentTab === 'statusHistory' && (
        <div className="p-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {orderStatusLogs.map((log, index) => (
                <OrderLogItem
                  key={index}
                  orderId={log.orderId}
                  customerName={log.customerName}
                  previousStatus={log.previousStatus}
                  status={log.status}
                  timestamp={log.timestamp}
                  comment={log.comment}
                  orders={orders}
                  setSelectedOrder={setSelectedOrder}
                />
              ))}
            </ul>
          </div>
        </div>
      )}

      {selectedOrder && (
        <OrderDetailModal
          selectedOrder={selectedOrder as any}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
