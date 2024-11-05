import LineButton from '../buttons/line';
import WidgetCard from '../cards/widget';

import OrderItem, { Order } from './widget-order-item';

const EmptyOrders = () => (
  <div className="text-center py-8">
    <p className="text-gray-500 text-lg">You have no recent orders</p>
    <div className="mt-4 w-36 mx-auto">
      <LineButton text="Start shopping" />
    </div>
  </div>
);

type WidgetOrderCardProps = {
  orders: Order[];
};

const WidgetOrderCard = ({ orders }: WidgetOrderCardProps) => {
  return (
    <WidgetCard
      title="Your recent orders"
      viewAllButton
      onViewAllClick={() => console.log('View all clicked')}
      isEmpty={orders.length === 0}
      emptyComponent={<EmptyOrders />}
    >
      {orders.map(order => (
        <OrderItem key={order.id} order={order} />
      ))}
    </WidgetCard>
  );
};

export default WidgetOrderCard;
