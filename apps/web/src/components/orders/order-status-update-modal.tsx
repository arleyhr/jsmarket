import { OrderEvents } from "@jsmarket/state-machines";

import { eventNames } from "./order-admin-card";

type OrderStatusUpdateModalProps = {
  loading: boolean;
  comment: string;
  onCancel: () => void;
  onConfirm: () => void;
  onCommentChange: (comment: string) => void;
  action: OrderEvents;
}

export default function OrderStatusUpdateModal({
  loading,
  comment,
  onCancel,
  onConfirm,
  onCommentChange,
  action
}: OrderStatusUpdateModalProps) {
  const actionLabel = eventNames[action];

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 h-32 mb-4 focus:border-yellow-500 focus:ring-yellow-500 hover:border-gray-400"
          placeholder="Enter any comments about this status change..."
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={onConfirm}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
