import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { GET_CATEGORIES, TCategory } from '../queries/products';

export const useCategoriesQuery = () => {
  const { data, loading, error } = useQuery(GET_CATEGORIES);

  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category'));

  const categories: TCategory[] = data?.categories ?? [];

  const category = searchParams.get('category');

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  return { categories, selectedCategory, loading, error };
};
