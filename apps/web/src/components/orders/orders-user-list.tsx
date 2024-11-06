import { useState } from "react";


import { Order, statusColors } from "../../pages/orders";

import OrderCard from "./order-card";
import OrdersEmpty from "./orders-empty";

type OrderListProps = {
  orders: Order[];
}

export type OrderItem = {
  thumbnail: string;
  title: string;
  quantity: number;
}


export default function OrderList({ orders }: OrderListProps) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (orders.length === 0) {
    return <OrdersEmpty />;
  }

  return (
    <div className="space-y-6">
      {orders.map(order => (
        <OrderCard
          key={order.id}
          orderId={order.id}
          status={order.status}
          createdAt={order.createdAt}
          updatedAt={order.updatedAt}
          total={order.total}
          items={order.items}
          statusColor={statusColors[order.status as keyof typeof statusColors]}
          isExpanded={expandedOrder === order.id.toString()}
          onToggle={toggleOrderDetails}
        />
      ))}
    </div>
  );
}
