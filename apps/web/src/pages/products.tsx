import { IconMoodEmpty } from '@tabler/icons-react';

import FiltersSidebar from '../components/filters/filters-sidebar';
import ProductCard from '../components/products/product-card';
import ProductsListSkeleton from '../components/products/products-list-skeleton';
import SortDropdown from '../components/products/sort-dropdown';
import { sortOptions, useProducts } from '../hooks/useProducts';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <IconMoodEmpty className="w-48 h-48 mb-6 opacity-50" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
      <p className="text-gray-500 text-center max-w-md">
        Sorry, we couldn't find any products matching your search criteria. Try adjusting your
        filters or starting a new search.
      </p>
    </div>
  );
}

export default function ProductsPage() {
  const {
    products,
    categories,
    selectedSortBy,
    filters,
    loading,
    error,
    handleCategoryChange,
    handleFilterChange,
  } = useProducts();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <ProductsListSkeleton />;
  }

  return (
    <div className="flex flex-wrap">
      <FiltersSidebar
        categories={categories}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
        selectedRatings={[]}
        onRatingChange={() => {
          console.log('rating changed');
        }}
        showDiscounted={selectedSortBy === 'discount'}
        onDiscountChange={checkbox => {
          handleFilterChange(checkbox ? 'discount' : '');
        }}
      />
      <div className="max-w-7xl mx-auto px-4 pb-4 flex-1">
        <div className="flex justify-end mb-6">
          <div className="relative">
            <SortDropdown
              sortBy={selectedSortBy}
              sortOptions={sortOptions}
              onSort={handleFilterChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div className="w-full flex-1" key={product.id}>
              <ProductCard productId={product.id} {...product} />
            </div>
          ))}
        </div>
        {products.length === 0 && <EmptyState />}
      </div>
    </div>
  );
}
