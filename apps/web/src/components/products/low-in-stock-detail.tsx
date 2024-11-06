interface LowInStockDetailProps {
  isLowStock: boolean;
  stock: number;
}

export default function LowInStockDetail({ isLowStock, stock }: LowInStockDetailProps) {
  return isLowStock ? (
    <p className="text-red-500 font-medium">
      Only {stock} units left in stock!
    </p>
  ) : (
    <p className="text-green-600 font-medium">In Stock</p>
  );
}
