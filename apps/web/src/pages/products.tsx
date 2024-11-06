import { useState } from 'react';

import FiltersSidebar from '../components/filters/filters-sidebar';
import ProductCard from '../components/products/product-card';
import SortDropdown from '../components/products/sort-dropdown';

import { product } from './product-detail';

const products = [
  product
];

const categories = ['beauty', 'electronics', 'furniture', 'home decoration'];

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState('');

  const sortOptions = [
    { label: 'Highest rated', value: 'rating' },
    { label: 'Most reviews', value: 'reviews' },
    { label: 'Price: low to high', value: 'price_asc' },
    { label: 'Price: high to low', value: 'price_desc' },
  ];

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  return (
    <div className="flex">
      <FiltersSidebar
        categories={categories}
        selectedCategories={[]}
        onCategoryChange={() => {
          console.log('category changed');
        }}
        selectedRatings={[]}
        onRatingChange={() => {
          console.log('rating changed');
        }}
        showDiscounted={false}
        onDiscountChange={() => {
          console.log('discount changed');
        }}
      />
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <div className="flex justify-end mb-6">
          <div className="relative">
            <SortDropdown sortBy={sortBy} sortOptions={sortOptions} onSort={handleSort} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} productId={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
