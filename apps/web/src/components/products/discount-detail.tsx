interface DiscountDetailProps {
  price: number;
  discountPercentage: number;
}

export default function DiscountDetail({ price, discountPercentage }: DiscountDetailProps) {
  return (
    <div className="flex items-baseline">
      {discountPercentage > 0 && (
        <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm mr-2">
          -{discountPercentage}%
        </span>
      )}
      <span className="text-3xl font-bold text-gray-900">
        ${((price * (100 - discountPercentage)) / 100).toFixed(2)}
      </span>
      {discountPercentage > 0 && <span className="ml-2 text-gray-500 line-through">${price}</span>}
    </div>
  );
}
