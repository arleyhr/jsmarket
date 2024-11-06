import { IconCube } from "@tabler/icons-react";

export default function OrdersEmpty() {
  return (
    <div className="text-center py-12">
      <IconCube
        className="mx-auto h-12 w-12 text-gray-400"
      />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
      <p className="mt-1 text-sm text-gray-500">Your orders will appear here when you make a purchase.</p>
    </div>
  );
};
