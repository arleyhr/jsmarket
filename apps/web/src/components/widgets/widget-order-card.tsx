import { useNavigate } from 'react-router-dom';

import { TOrder } from '../../queries/orders';
import LineButton from '../buttons/line';
import WidgetCard from '../cards/widget';

import OrderItem from './widget-order-item';

const EmptyOrders = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-8">
      <p className="text-gray-500 text-lg">You have no recent orders</p>
    <div className="mt-4 w-36 mx-auto">
      <LineButton text="Start shopping" onClick={() => navigate('/products')} />
    </div>
    </div>
  );
};

type WidgetOrderCardProps = {
  orders: TOrder[];
};

const WidgetOrderCard = ({ orders }: WidgetOrderCardProps) => {
  const navigate = useNavigate();

  return (
    <WidgetCard
      title="Your recent orders"
      viewAllButton
      onViewAllClick={() => navigate('/orders')}
      isEmpty={orders.length === 0}
      emptyComponent={<EmptyOrders />}
    >
      {orders.map(order => (
        <OrderItem
          key={order.id}
          image={order.items[0].productImage}
          productName={order.items[0].productName}
          status={order.status}
        />
      ))}
    </WidgetCard>
  );
};

export default WidgetOrderCard;
