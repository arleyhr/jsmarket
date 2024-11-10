import { IconChevronDown } from "@tabler/icons-react";

type SortOption = {
  label: string;
  value: string;
}

type SortDropdownProps = {
  sortBy: string;
  sortOptions: SortOption[];
  onSort: (value: string) => void;
}

const SortDropdown = ({ sortBy, sortOptions, onSort }: SortDropdownProps) => (
  <div className="relative">
    <select
      className="appearance-none h-10 w-full sm:w-64 bg-gray-100 text-gray-800 px-4 pr-8 rounded-lg focus:outline-none border border-gray-300"
      value={sortBy}
      onChange={e => onSort(e.target.value)}
    >
      <option value="" disabled>
        Sort by
      </option>
      {sortOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <IconChevronDown />
    </div>
  </div>
);

export default SortDropdown;
