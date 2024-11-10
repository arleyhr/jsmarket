import { IconFilter, IconMoodEmpty, IconX } from '@tabler/icons-react';
import { useState } from 'react';

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <ProductsListSkeleton />;
  }

  return (
    <div className="flex flex-wrap">
      <div className="lg:hidden mb-4 w-full px-4">
        <button
          className="w-full py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center gap-2 transition-colors duration-150 ease-in-out"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <IconFilter className="w-4 h-4 mr-2" /> Filters
        </button>
      </div>
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
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
      </div>
      <div className="lg:hidden">
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative w-full max-w-xs bg-white h-full">
              <div className="h-full flex flex-col overflow-y-auto">
                <div className="px-4 py-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <IconX className="w-4 h-4" />
                    </button>
                  </div>
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full lg:flex-1 px-4 pb-4">
        <div className="flex justify-end mb-4 sm:mb-6">
          <div className="relative w-full sm:w-auto">
            <SortDropdown
              sortBy={selectedSortBy}
              sortOptions={sortOptions}
              onSort={handleFilterChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => (
            <div className="w-full" key={product.id}>
              <ProductCard productId={product.id} {...product} />
            </div>
          ))}
        </div>
        {products.length === 0 && <EmptyState />}
      </div>
    </div>
  );
}
