import QuantitySelector from "./cart-qty-selector";
import RemoveButton from "./cart-remove";
import { CartProduct } from "./cart-sidebar";

type ProductCardProps = {
  product: CartProduct;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
};

const ProductCard = ({ product, onRemove, onQuantityChange }: ProductCardProps) => (
  <div className="flex flex-col items-center mb-2 p-1">
    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover mb-2" />
    <p className="text-black font-semibold text-center">${product.price}</p>
    <div className="flex items-center gap-2 mt-2">
      <QuantitySelector quantity={product.quantity} onQuantityChange={onQuantityChange} />
      <RemoveButton onClick={onRemove} />
    </div>
  </div>
);

export default ProductCard;
