import { IconChevronDown } from '@tabler/icons-react';

import { TCategory } from '../../queries/products';

type CategorySelectProps = {
  categories: TCategory[];
  onChange?: (value: string) => void;
  value?: string;
};


const CategorySelect = ({ categories, onChange, value }: CategorySelectProps) => (
  <div className="relative">
    <select
      className="appearance-none h-10 w-32 bg-gray-100 text-black px-4 pr-8 rounded-l-lg focus:outline-none"
      value={value}
      onChange={e => onChange && onChange(e.target.value)}
    >
      <option value="">All</option>
      {categories.map(category => (
        <option key={category.slug} value={category.slug}>
          {category.name}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
      <IconChevronDown />
    </div>
  </div>
);

export default CategorySelect;
