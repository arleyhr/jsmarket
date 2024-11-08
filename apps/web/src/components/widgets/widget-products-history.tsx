import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TProduct } from '../../queries/products';
import LineButton from '../buttons/line';
import WidgetCard from '../cards/widget';

import WidgetProductsHistoryItem from './widget-products-history-item';

const EmptyProducts = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-8">
      <p className="text-gray-500 text-lg">No products viewed recently</p>
      <div className="mt-4 w-36 mx-auto">
        <LineButton text="Start shopping" onClick={() => navigate('/products')} />
      </div>
    </div>
  );
};

type WidgetProductsHistoryProps = {
  products: TProduct[];
  onAddToCart: (productId: number) => void;
};

const WidgetProductsHistory = ({ products, onAddToCart }: WidgetProductsHistoryProps) => {
  const [viewAll, setViewAll] = useState(false);

  const productsToShow = viewAll ? products : products.slice(0, 3);

  return (
    <WidgetCard
      title="Your recently viewed products"
      viewShowAll={!viewAll && products.length > 3}
      onShowAllClick={() => setViewAll(true)}
      isEmpty={products.length === 0}
      emptyComponent={<EmptyProducts />}
    >
      {productsToShow.map(product => (
        <WidgetProductsHistoryItem
          key={product.id}
          productId={product.id}
          image={product.images[0]}
          name={product.title}
          price={product.price}
          onAddToCart={() => onAddToCart(product.id)}
        />
      ))}
    </WidgetCard>
  );
};

export default WidgetProductsHistory;
