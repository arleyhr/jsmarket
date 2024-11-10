import { canCancelOrder, OrderEvents, OrderStatus } from "@jsmarket/state-machines";
import { useState } from "react";

import { useUpdateOrderStatus } from "../../hooks/useOrders";
import { TOrder } from "../../queries/orders";

import ConfirmCancelOrderModal from "./cancel-confirm-modal";
import OrderCard from "./order-card";
import OrdersEmpty from "./orders-empty";

type OrderListProps = {
  orders: TOrder[];
}

export type OrderItem = {
  thumbnail: string;
  title: string;
  quantity: number;
}

export default function OrderList({ orders }: OrderListProps) {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [cancelOrderId, setCancelOrderId] = useState<number | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  const { updateOrderStatus, loading } = useUpdateOrderStatus();

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (orders.length === 0) {
    return <OrdersEmpty />;
  }

  const handleCancelOrder = (orderId: number) => {
    setCancelOrderId(orderId);
  };

  const confirmCancelOrder = () => {
    if (cancelOrderId) {
      updateOrderStatus(cancelOrderId, OrderEvents.cancel, cancelReason);
      setCancelOrderId(null);
      setCancelReason('');
    }
  };

  const handleMarkDelivered = (orderId: number) => {
    updateOrderStatus(orderId, OrderEvents.deliver);
  };

  return (
    <div className="space-y-6">
      {orders.map(order => (
        <OrderCard
          key={order.id}
          isCancelable={canCancelOrder(order.status as OrderStatus)}
          isMarkableAsDelivered={order.status === OrderStatus.Shipped}
          orderId={order.id}
          status={order.status}
          createdAt={order.createdAt}
          updatedAt={order.updatedAt}
          total={order.total}
          items={order.items}
          isExpanded={expandedOrder === order.id}
          onToggle={() => toggleOrderDetails(order.id)}
          onCancelOrder={() => handleCancelOrder(order.id)}
          onMarkDelivered={() => handleMarkDelivered(order.id)}
        />
      ))}
      {
        cancelOrderId && (
          <ConfirmCancelOrderModal
            cancelReason={cancelReason}
            onCancel={() => setCancelOrderId(null)}
            onConfirm={confirmCancelOrder}
            onReasonChange={(reason) => setCancelReason(reason)}
            loading={loading}
          />
        )
      }
    </div>
  );
}
