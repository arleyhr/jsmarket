import { useState } from 'react';

import LineButton from '../buttons/line';
import WidgetCard from '../cards/widget';

import WidgetProductsHistoryItem, { Product } from './widget-products-history-item';

const EmptyProducts = () => (
  <div className="text-center py-8">
    <p className="text-gray-500 text-lg">No products viewed recently</p>
    <div className="mt-4 w-36 mx-auto">
      <LineButton text="Start shopping" />
    </div>
  </div>
);

type WidgetProductsHistoryProps = {
  products: Product[];
};

const WidgetProductsHistory = ({ products }: WidgetProductsHistoryProps) => {
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
        <WidgetProductsHistoryItem key={product.id} product={product} />
      ))}
    </WidgetCard>
  );
};

export default WidgetProductsHistory;
