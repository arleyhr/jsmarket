import { IconChevronDown } from '@tabler/icons-react';

type CategoryOption = {
  label: string;
  value: string;
};

type CategorySelectProps = {
  options?: CategoryOption[];
  onChange?: (value: string) => void;
  value?: string;
};

const defaultOptions: CategoryOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Products', value: 'products' },
  { label: 'Categories', value: 'categories' },
];

const CategorySelect = ({ options = defaultOptions, onChange, value }: CategorySelectProps) => (
  <div className="relative">
    <select
      className="appearance-none h-10 w-32 bg-gray-100 text-black px-4 pr-8 rounded-l-lg focus:outline-none"
      value={value}
      onChange={e => onChange && onChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
      <IconChevronDown />
    </div>
  </div>
);

export default CategorySelect;
