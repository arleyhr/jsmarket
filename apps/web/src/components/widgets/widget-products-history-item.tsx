import { Link } from "react-router-dom";

import AddToCartButton from "../buttons/add-to-cart";

export type WidgetProductsHistoryItemProps = {
  productId: number;
  image: string;
  name: string;
  price: number;
  onAddToCart: () => void;
}

const WidgetProductsHistoryItem = ({ productId, image, name, price, onAddToCart }: WidgetProductsHistoryItemProps) => (
  <div className="flex items-center justify-between space-x-4">
    <div className="flex items-center flex-1">
      <img src={image} alt={name} className="w-20 h-20 object-cover rounded-md" />
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-start">
          <Link to={`/products/${productId}`} className="font-medium text-gray-900 line-clamp-2">{name}</Link>
          <span className="text-lg font-semibold text-gray-900 ml-4 shrink-0">${price}</span>
        </div>
        <AddToCartButton onClick={onAddToCart} />
      </div>
    </div>
  </div>
);

export default WidgetProductsHistoryItem;
