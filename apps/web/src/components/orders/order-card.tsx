import { statusColors } from "../../pages/orders";

type OrderItem = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  name: string;
};

type OrderCardProps = {
  orderId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  total: number;
  items: OrderItem[];
  isExpanded: boolean;
  onToggle: (orderId: string) => void;
}

export default function OrderCard({
  orderId,
  status,
  createdAt,
  updatedAt,
  total,
  items,
  isExpanded,
  onToggle
}: OrderCardProps) {
  const statusColor = statusColors[status as keyof typeof statusColors];

  return (
    <div className="border rounded-lg p-6 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <p className="font-semibold text-lg">ORDER #{orderId}</p>
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
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
          <button
            onClick={() => onToggle(orderId.toString())}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            {isExpanded ? 'Hide order details' : 'View order details'}
          </button>
        </div>
        {isExpanded ? (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 mt-3">
                <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Price: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-6 mt-3">
            <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
            <div>
              <p className="font-medium">{items[0].name}</p>
              <p className="text-sm text-gray-600 mt-1">Quantity: {items[0].quantity}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
