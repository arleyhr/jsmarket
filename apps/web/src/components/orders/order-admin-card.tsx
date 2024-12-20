import { canCancelOrder, OrderEvents, OrderStatus } from "@jsmarket/state-machines";
import { getNextEvent } from "@jsmarket/state-machines";

import { statusColors } from "../../pages/orders";

type OrderAdminCardProps = {
  orderId: number;
  status: string;
  total: number;
  createdAt: Date;
  customerName: string;
  onChangeStatus: (action: OrderEvents) => void;
  onViewDetails: () => void;
  onCancel: () => void;
};

export const eventNames = {
  [OrderEvents.startPreparation]: 'Start Preparation',
  [OrderEvents.cancel]: 'Cancel',
  [OrderEvents.ship]: 'Ship',
  [OrderEvents.deliver]: 'Deliver',
  [OrderEvents.approveReview]: 'Approve Review',
};

export default function OrderAdminCard({
  orderId,
  status,
  total,
  createdAt,
  customerName,
  onChangeStatus,
  onViewDetails,
  onCancel,
}: OrderAdminCardProps) {
  const statusColor = statusColors[status as keyof typeof statusColors];
  const nextEvent = getNextEvent(status as OrderStatus) as OrderEvents;
  const isCancelable = canCancelOrder(status as OrderStatus);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm font-medium text-gray-900">Order #{orderId}</span>
          <p className="text-sm text-gray-500">{customerName}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
          {status}
        </span>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Date</span>
          <span className="text-gray-900">{createdAt.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500">Total</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-end space-y-2 min-h-[132px]">
        {nextEvent && (
          <button
            onClick={() => onChangeStatus(nextEvent)}
            className="w-full text-sm rounded border border-gray-300 bg-white px-3 py-2 hover:bg-gray-50"
          >
            {eventNames[nextEvent]}
          </button>
        )}
        <button
          onClick={onViewDetails}
          className="w-full text-sm text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded"
        >
          View Details
        </button>
        {isCancelable && (
          <button
            disabled={!isCancelable}
            onClick={onCancel}
            className="w-full text-sm text-red-600 hover:text-red-800 px-3 py-2"
        >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
