import AddToCartButton from "../buttons/add-to-cart";

export type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
}

export type WidgetProductsHistoryItemProps = {
  product: Product;
}

const WidgetProductsHistoryItem = ({ product }: WidgetProductsHistoryItemProps) => (
  <div className="flex items-center justify-between space-x-4">
    <div className="flex items-center flex-1">
      <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
          <span className="text-lg font-semibold text-gray-900 ml-4 shrink-0">{product.price}</span>
        </div>
        <AddToCartButton />
      </div>
    </div>
  </div>
);

export default WidgetProductsHistoryItem;
