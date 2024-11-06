import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_PRODUCT_DETAILS, TProduct } from '../queries/products';

import { useStorageProductsViewed } from './useStorageProductsViewed';

export const useProductDetailsQuery = () => {
  const { addProduct } = useStorageProductsViewed();
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: {
      productId: Number(id),
    },
    onCompleted: (data) => {
      if (data.product?.id) {
        addProduct(data.product);
      }
    },
  });

  const product: TProduct = data?.product ?? {};

  return { product, loading, error };
};
