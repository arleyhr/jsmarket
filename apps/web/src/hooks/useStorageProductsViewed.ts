import { useState } from 'react';

const MAX_VIEWED_PRODUCTS = 6;

export function useStorageProductsViewed() {
  const [viewedProducts, setViewedProducts] = useState<any[]>(() => {
    const storedProducts = localStorage.getItem('viewedProducts');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  const addProduct = (product: any) => {
    setViewedProducts(prev => {
      const updatedProducts = [product, ...prev.filter(p => p?.id !== product.id)];
      localStorage.setItem('viewedProducts', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const products =
    viewedProducts.length > MAX_VIEWED_PRODUCTS
      ? viewedProducts.slice(0, MAX_VIEWED_PRODUCTS)
      : viewedProducts;

  return { viewedProducts: products, addProduct };
}
