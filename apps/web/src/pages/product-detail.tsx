import AddProductButton from '../components/buttons/add-product';
import BuyNowButton from '../components/buttons/buy-now';
import DiscountDetail from '../components/products/discount-detail';
import LowInStockDetail from '../components/products/low-in-stock-detail';
import ProductBreadcrumbs from '../components/products/product-breadcrumbs';
import Rating from '../components/products/rating';
import ReviewList from '../components/products/review-list';

const LOW_STOCK_THRESHOLD = 5;

export const product = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description:
    'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
  category: 'beauty',
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.94,
  stock: 5,
  tags: ['beauty', 'mascara'],
  brand: 'Essence',
  sku: 'RCH45Q1A',
  weight: 2,
  dimensions: {
    width: 23.17,
    height: 14.43,
    depth: 28.01,
  },
  warrantyInformation: '1 month warranty',
  shippingInformation: 'Ships in 1 month',
  availabilityStatus: 'Low Stock',
  reviews: [
    {
      rating: 2,
      comment: 'Very unhappy with my purchase!',
      date: '2024-05-23T08:56:21.618Z',
      reviewerName: 'John Doe',
      reviewerEmail: 'john.doe@x.dummyjson.com',
    },
    {
      rating: 2,
      comment: 'Not as described!',
      date: '2024-05-23T08:56:21.618Z',
      reviewerName: 'Nolan Gonzalez',
      reviewerEmail: 'nolan.gonzalez@x.dummyjson.com',
    },
    {
      rating: 5,
      comment: 'Very satisfied!',
      date: '2024-05-23T08:56:21.618Z',
      reviewerName: 'Scarlett Wright',
      reviewerEmail: 'scarlett.wright@x.dummyjson.com',
    },
  ],
  returnPolicy: '30 days return policy',
  minimumOrderQuantity: 24,
  meta: {
    createdAt: '2024-05-23T08:56:21.618Z',
    updatedAt: '2024-05-23T08:56:21.618Z',
    barcode: '9164035109868',
    qrCode: 'https://assets.dummyjson.com/public/qr-code.png',
  },
  images: [
    'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
  ],
  thumbnail:
    'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
};

export default function ProductDetail() {
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
