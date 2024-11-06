import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useCategoriesQuery } from '../../hooks/useCategories';
import SearchButton from '../buttons/search';
import CategorySelect from '../category-select';

type SearchBarProps = {
  onSearch: (value: string, category: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category'));
  const { categories, selectedCategory: selectedCategoryFromQuery } = useCategoriesQuery();

  const handleSearch = () => {
    onSearch(searchValue, selectedCategory || '');
  };

  useEffect(() => {
    setSelectedCategory(selectedCategoryFromQuery);
  }, [selectedCategoryFromQuery]);

  return (
    <div className="flex-1 mx-8 max-w-4xl">
      <div className="flex">
        <CategorySelect
          value={selectedCategory || ''}
          categories={categories}
          onChange={value => setSelectedCategory(value)}
        />
        <input
          type="text"
          className="flex-1 h-10 px-4 bg-white focus:outline-none text-black"
          placeholder="Search..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <SearchButton onClick={() => handleSearch && handleSearch()} />
      </div>
    </div>
  );
};

export default SearchBar;
