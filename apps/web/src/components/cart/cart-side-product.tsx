import { Link } from "react-router-dom";

import QuantitySelector from "./cart-qty-selector";
import RemoveButton from "./cart-remove";

type ProductCardProps = {
  productId: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
};

const ProductCard = ({ productId, image, name, price, quantity, onRemove, onQuantityChange }: ProductCardProps) => (
  <div className="flex flex-col items-center mb-2 p-1">
    <Link to={`/products/${productId}`}>
      <img src={image} alt={name} className="w-20 h-20 object-cover mb-2" />
    </Link>
    <p className="text-black font-semibold text-center">${price * quantity}</p>
    <div className="flex items-center gap-2 mt-2">
      <QuantitySelector quantity={quantity} onQuantityChange={onQuantityChange} />
      <RemoveButton onClick={onRemove} />
    </div>
  </div>
);

export default ProductCard;
