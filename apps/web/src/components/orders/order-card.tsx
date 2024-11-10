import { Link } from 'react-router-dom';

import { statusColors } from '../../pages/orders';
import { TOrderItem } from '../../queries/orders';

type OrderCardProps = {
  isCancelable?: boolean;
  isMarkableAsDelivered?: boolean;
  orderId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  total: number;
  items: TOrderItem[];
  isExpanded?: boolean;
  onToggle?: () => void;
  onCancelOrder?: () => void;
  onMarkDelivered?: () => void;
  defaultExpanded?: boolean;
};

export default function OrderCard({
  isCancelable,
  isMarkableAsDelivered,
  orderId,
  status,
  createdAt,
  updatedAt,
  total,
  items,
  isExpanded,
  onToggle,
  onCancelOrder,
  onMarkDelivered,
  defaultExpanded,
}: OrderCardProps) {
  const statusColor = statusColors[status as keyof typeof statusColors];

  return (
    <div className="border rounded-lg p-6 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <p className="font-semibold text-lg">ORDER #{orderId}</p>
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Placed on {new Date(createdAt).toLocaleDateString()}
          </p>
          {status === 'delivered' && (
            <p className="text-sm text-gray-500 mt-1">
              Delivered on {new Date(updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">${total}</p>
        </div>
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between mb-2">
          <p className="text-sm font-medium">{items.length} items</p>
          {!defaultExpanded && (
            <button
              onClick={onToggle}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              View order details
            </button>
          )}
        </div>
        {isExpanded || defaultExpanded ? (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.productId} className="flex gap-6 mt-3">
                <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div>
                  <Link to={`/products/${item.productId}`}>
                    <p className="font-medium">{item.productName}</p>
                  </Link>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="block">Qty: {item.quantity}</span>
                    <span className="block mt-1">Subtotal: ${item.price}</span>
                    <span className="block mt-1 font-medium">Total: ${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-6 mt-3">
            <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
              <img
                src={items[0].productImage}
                alt={items[0].productName}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div>
              <Link to={`/products/${items[0].productId}`}>
                <p className="font-medium">{items[0].productName}</p>
              </Link>
              <div className="text-sm text-gray-600 mt-1">
                <span className="block">Qty: {items[0].quantity}</span>
                <span className="block mt-1">Subtotal: ${items[0].price}</span>
                <span className="block mt-1 font-medium">
                  Total: ${items[0].price * items[0].quantity}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 flex gap-4">
          {isCancelable && (
            <button className="text-sm text-red-600 hover:text-red-800" onClick={onCancelOrder}>
              Cancel Order
            </button>
          )}
          {isMarkableAsDelivered && (
            <button
              className="text-sm bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
              onClick={onMarkDelivered}
            >
              I received my order!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
