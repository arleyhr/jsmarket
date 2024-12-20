import { IconChevronRight } from '@tabler/icons-react';

import { statusColors } from '../../pages/orders';

type OrderLogItemProps = {
  orderId: number;
  previousStatus: string | null;
  status: string;
  timestamp: Date;
  viewOrderDetail: () => void;
}

export default function OrderLogItem({ orderId, previousStatus, status, timestamp, viewOrderDetail }: OrderLogItemProps) {
  return (
    <li className="p-4 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-900">#{orderId}</span>
          <div className="flex items-center space-x-2">
            {previousStatus && (
              <>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[previousStatus as keyof typeof statusColors]}`}>
                  {previousStatus}
                </span>
                <IconChevronRight className="text-gray-400" size={16} />
              </>
            )}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
              {status}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {timestamp.toLocaleString()}
          </span>
        </div>
        <button
          onClick={viewOrderDetail}
          className="text-gray-600 hover:text-gray-800 text-xs underline"
        >
          View details
        </button>
      </div>
    </li>
  );
}
