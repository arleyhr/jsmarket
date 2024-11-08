import { statusColors } from '../../pages/orders';

type OrderItemProps = {
  image: string;
  productName: string;
  status: string;
};

const OrderItem = ({ image, productName, status }: OrderItemProps) => {
  const statusColor = statusColors[status as keyof typeof statusColors];

  return (
    <div className="flex items-center space-x-4">
      <img src={image} alt={productName} className="w-20 h-20 object-cover rounded-md" />
      <div>
        <h3 className="font-medium text-gray-900">{productName}</h3>
        <span className={`text-sm ${statusColor}`}>{status}</span>
      </div>
    </div>
  );
};

export default OrderItem;
