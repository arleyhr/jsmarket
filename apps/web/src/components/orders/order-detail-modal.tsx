import OrderCard from "./order-card";

type OrderDetailModalProps = {
  selectedOrder: {
    id: string;
    customerName: string;
    status: 'pending' | 'review' | 'preparation' | 'shipped' | 'delivered';
    date: string;
    total: number;
    items: {
      id: string;
      name: string;
      quantity: number;
      price: number;
    }[];
  } | null;
  onClose: () => void;
}

export default function OrderDetailModal({ selectedOrder, onClose }: OrderDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium">Order Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <OrderCard {...selectedOrder as any} />
        </div>
      </div>
    </div>
  );
}
