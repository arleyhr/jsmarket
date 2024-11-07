import { IconX } from '@tabler/icons-react';

import { TOrderItem } from '../../queries/orders';

import OrderCard from './order-card';

type OrderDetailModalProps = {
  orderId: number;
  status: string;
  date: string;
  total: number;
  comment: string;
  customerName?: string;
  items: TOrderItem[];
  onClose: () => void;
};

export default function OrderDetailModal({
  orderId,
  status,
  date,
  total,
  comment,
  customerName,
  items,
  onClose,
}: OrderDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium">Order Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Close</span>
            <IconX size={16} />
          </button>
        </div>
        {customerName && (
          <div className="p-6 pb-0">
            <div className="flex items-center gap-2">
              <span className="font-medium">Customer:</span>
              <p className="text-gray-600">{customerName}</p>
            </div>
          </div>
        )}
        {comment && (
          <div className="p-6 pb-0">
            <div className="flex items-center gap-2">
              <span className="font-medium">Comment:</span>
              <p className="text-gray-600">{comment}</p>
            </div>
          </div>
        )}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <OrderCard
            orderId={orderId}
            status={status}
            createdAt={date}
            updatedAt={date}
            total={total}
            items={items}
            isCancelable={false}
            defaultExpanded
          />
        </div>
      </div>
    </div>
  );
}
