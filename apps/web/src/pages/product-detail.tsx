import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddProductButton from '../components/buttons/add-product';
import BuyNowButton from '../components/buttons/buy-now';
import DetailSkeleton from '../components/products/detail-skeleton';
import DiscountDetail from '../components/products/discount-detail';
import LowInStockDetail from '../components/products/low-in-stock-detail';
import ProductBreadcrumbs from '../components/products/product-breadcrumbs';
import Rating from '../components/products/rating';
import ReviewList from '../components/products/review-list';
import { useAddToCart } from '../hooks/useCart';
import { useProductDetailsQuery } from '../hooks/useProductDetail';

const LOW_STOCK_THRESHOLD = 5;

export default function ProductDetail() {
  const { product, loading, error } = useProductDetailsQuery();
  const { addToCart, loading: addToCartLoading } = useAddToCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (loading) return <DetailSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  const isLowStock = product.stock <= LOW_STOCK_THRESHOLD;

  const handleCheckout = async () => {
    await addToCart(product.id, quantity);
    navigate('/cart');
  };

  const handleAddToCart = () => addToCart(product.id, quantity);

  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <ProductBreadcrumbs product={product} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="md:sticky md:top-0">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-[300px] md:h-auto object-cover rounded-lg"
          />
        </div>

        <div className="px-2 md:px-0">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            By <span className="text-blue-500">{product.brand}</span>
          </p>

          <div className="flex items-center mt-2">
            <Rating rating={product.rating} />
            <a href="#reviews" className="ml-2 text-sm md:text-base text-blue-500 hover:underline">
              {product.reviews.length} reviews
            </a>
          </div>

          <div className="border-t border-b border-gray-200 py-3 md:py-4 my-3 md:my-4">
            <DiscountDetail price={product.price} discountPercentage={product.discountPercentage} />
          </div>

          <LowInStockDetail isLowStock={isLowStock} stock={product.stock} />

          <div className="flex items-center mt-4">
            <label htmlFor="quantity" className="mr-2 text-sm md:text-base text-gray-700">
              Quantity:
            </label>
            <select
              id="quantity"
              name="quantity"
              className="border rounded-md p-1.5 md:p-2 text-sm md:text-base"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
            >
              {[...Array(10).keys()].map(num => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <AddProductButton
              onClick={handleAddToCart}
              loading={addToCartLoading}
              disabled={addToCartLoading}
            />

            <BuyNowButton
              onClick={handleCheckout}
              loading={addToCartLoading}
              disabled={addToCartLoading}
            />
          </div>

          <div className="mt-6">
            <h2 className="text-lg md:text-xl font-bold mb-2">About this product</h2>
            <p className="text-sm md:text-base text-gray-700">{product.description}</p>
          </div>

          <div id="reviews" className="mt-6 md:mt-8">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Reviews</h2>
            <ReviewList reviews={product.reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
