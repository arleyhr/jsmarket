import { useState } from 'react';

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

    return { viewedProducts, addProduct };
}
