import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';

import { GET_PRODUCTS, TProduct } from '../queries/products';

import { useCategoriesQuery } from './useCategories';

const DEFAULT_SORT_BY = 'rating';
const DEFAULT_ORDER = 'desc';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

const DEFAULT_CATEGORY = null;

export const sortOptions = [
  { label: 'Highest rated', value: 'rating' },
  { label: 'Most reviews', value: 'reviews' },
  { label: 'Price: low to high', value: 'price_asc' },
  { label: 'Price: high to low', value: 'price_desc' },
];

const resolveFilter = (filter: string) => {
  switch (filter) {
    case 'rating':
      return {
        sortBy: 'rating',
      };
    case 'reviews':
      return {
        sortBy: 'reviews',
      };
    case 'price_asc':
      return {
        sortBy: 'price',
        order: 'asc',
      };
    case 'price_desc':
      return {
        sortBy: 'price',
        order: 'desc',
      };
    case 'sale':
      return {
        sortBy: 'sale',
      };
    default:
      return {
        sortBy: DEFAULT_SORT_BY,
        order: DEFAULT_ORDER,
      };
  }
};

export const useProductsQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || DEFAULT_PAGE.toString());
  const perPage = parseInt(searchParams.get('perPage') || DEFAULT_PER_PAGE.toString());
  const search = searchParams.get('query') || '';
  const categoryFilter = searchParams.get('category') || DEFAULT_CATEGORY;
  const sortByFilter = searchParams.get('sortBy') || DEFAULT_SORT_BY;

  const resolvedFilters = resolveFilter(sortByFilter);

  const filters = {
    page,
    perPage,
    search,
    category: categoryFilter,
    ...resolvedFilters,
  };

  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      ...filters,
    },
  });

  const { categories, loading: categoriesLoading, error: categoriesError } = useCategoriesQuery();

  const products: TProduct[] = data?.products.data ?? [];
    const handleCategoryChange = (category: string | null) => {
      setSearchParams(prevParams => {
        const updatedParams = new URLSearchParams();
        updatedParams.set('category', category ?? '');
        return updatedParams;
      });
    };

    const handleFilterChange = (filter: string) => {
      setSearchParams(prevParams => {
      const updatedParams = new URLSearchParams(prevParams);

      updatedParams.set('sortBy', filter);

      return updatedParams;
    });
  };

  return {
    products,
    categories,
    filters,
    handleCategoryChange,
    handleFilterChange,
    selectedSortBy: sortByFilter,
    loading: loading || categoriesLoading,
    error: error || categoriesError,
  };
};
