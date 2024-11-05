type OrderStatus = 'delivered' | 'in-transit' | 'processing';

export type Order = {
  id: string;
  productName: string;
  image: string;
  status: OrderStatus;
  deliveryDate?: string;
};

type OrderItemProps = {
  order: Order;
};

const getStatusColor = (status: OrderStatus): string => {
  const colors = {
    delivered: 'text-green-600',
    'in-transit': 'text-blue-600',
    processing: 'text-yellow-600',
  };
  return colors[status];
};

const getStatusText = (status: OrderStatus, deliveryDate?: string): string => {
  switch (status) {
    case 'delivered':
      return `Delivered on ${deliveryDate}`;
    case 'in-transit':
      return 'In transit';
    case 'processing':
      return 'Processing';
  }
};

const OrderItem = ({ order }: OrderItemProps) => (
  <div className="flex items-center space-x-4">
    <img src={order.image} alt={order.productName} className="w-20 h-20 object-cover rounded-md" />
    <div>
      <h3 className="font-medium text-gray-900">{order.productName}</h3>
      <span className={`text-sm ${getStatusColor(order.status)}`}>
        {getStatusText(order.status, order.deliveryDate)}
      </span>
    </div>
  </div>
);

export default OrderItem;
