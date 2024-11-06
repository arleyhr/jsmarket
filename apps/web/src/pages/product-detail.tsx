import AddProductButton from '../components/buttons/add-product';
import BuyNowButton from '../components/buttons/buy-now';
import DetailSkeleton from '../components/products/detail-skeleton';
import DiscountDetail from '../components/products/discount-detail';
import LowInStockDetail from '../components/products/low-in-stock-detail';
import ProductBreadcrumbs from '../components/products/product-breadcrumbs';
import Rating from '../components/products/rating';
import ReviewList from '../components/products/review-list';
import { useProductDetailsQuery } from '../hooks/useProductDetail';

const LOW_STOCK_THRESHOLD = 5;

export default function ProductDetail() {
  const { product, loading, error } = useProductDetailsQuery();

  if (loading) return <DetailSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  const isLowStock = product.stock <= LOW_STOCK_THRESHOLD;

  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <ProductBreadcrumbs product={product} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="sticky top-0">
          <img src={product.images[0]} alt={product.title} className="w-full rounded-lg" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-gray-500 mt-1">
            By <span className="text-blue-500">{product.brand}</span>
          </p>

          <div className="flex items-center mt-2">
            <Rating rating={product.rating} />
            <a href="#reviews" className="ml-2 text-blue-500 hover:underline">
              {product.reviews.length} reviews
            </a>
          </div>

          <div className="border-t border-b border-gray-200 py-4 my-4">
            <DiscountDetail price={product.price} discountPercentage={product.discountPercentage} />
          </div>

          <LowInStockDetail isLowStock={isLowStock} stock={product.stock} />

          <AddProductButton />

          <BuyNowButton />

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">About this product</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div id="reviews" className="mt-8">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <ReviewList reviews={product.reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
