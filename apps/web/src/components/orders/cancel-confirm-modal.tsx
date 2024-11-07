import CancelButton from "../buttons/cancel";

type ConfirmCancelOrderModalProps = {
  loading: boolean;
  cancelReason: string;
  onCancel: () => void;
  onConfirm: () => void;
  onReasonChange: (reason: string) => void;
}

export default function ConfirmCancelOrderModal({
  loading,
  cancelReason,
  onCancel,
  onConfirm,
  onReasonChange
}: ConfirmCancelOrderModalProps) {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h3 className="text-lg font-semibold mb-4">Confirm Order Cancellation</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to cancel this order? Please provide the reason for cancellation:
        </p>
        <textarea
          className="w-full border rounded-lg p-3 h-32 mb-4"
          placeholder="Enter cancellation reason..."
          value={cancelReason}
          onChange={(e) => onReasonChange(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            onClick={onCancel}
          >
            Cancel
          </button>
          <CancelButton
            disabled={loading}
            loading={loading}
            onClick={onConfirm}
            label="Confirm Cancellation"
          />
        </div>
      </div>
    </div>
  );
}
