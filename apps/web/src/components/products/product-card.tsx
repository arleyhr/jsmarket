import { Link } from 'react-router-dom';

import { useAddToCart } from '../../hooks/useCart';

import Rating from './rating';

type ProductCardProps = {
  productId: number;
  title: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
};

export default function ProductCard({
  productId,
  title,
  thumbnail,
  price,
  discountPercentage,
  rating,
  category,
}: ProductCardProps) {
  const { addToCart, loading } = useAddToCart();

  return (
    <div className="bg-gray-100 p-0 border border-gray-300 rounded-lg overflow-hidden">
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
            -{discountPercentage}%
          </div>
        )}
      </div>
      <div className="mt-4 p-2">
        <Link to={`/products/${productId}`}>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem] cursor-pointer hover:underline">
            {title}
          </h3>
        </Link>
        <div className="flex items-center mt-2">
          <Rating rating={rating} />
          <span className="text-gray-500 text-sm ml-2">({rating})</span>
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold text-gray-900">${price}</span>
          {discountPercentage > 0 && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${((price * (100 + discountPercentage)) / 100).toFixed(2)}
            </span>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-500">{category}</div>
      </div>
      <div className="p-2">
        <button
          disabled={loading}
          className={`w-full mt-4 py-2 rounded-lg text-black ${
            loading ? 'bg-amber-200 cursor-not-allowed' : 'bg-amber-300 hover:bg-amber-400'
          }`}
          onClick={() => addToCart(productId)}
        >
          {loading ? ' Adding...' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}
