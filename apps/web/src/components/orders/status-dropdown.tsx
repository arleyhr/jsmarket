import { OrderStatus } from '@jsmarket/state-machines';

interface StatusDropdownProps {
  value: string;
  onChange: (value: OrderStatus) => void;
}

const statusOptions = Object.values(OrderStatus).map(status => ({
  value: status,
  label: status,
}));

export function StatusDropdown({ value, onChange }: StatusDropdownProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-4 mb-8">
      <select
        value={value}
        onChange={e => onChange(e.target.value as OrderStatus)}
        className="min-w-[200px] rounded-md border border-gray-300 py-2 px-4 text-gray-600 focus:border-yellow-500 focus:ring-yellow-500 hover:border-gray-400"
      >
        <option value="">All</option>
        {statusOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
