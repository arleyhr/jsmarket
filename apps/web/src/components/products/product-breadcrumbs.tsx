import { Link } from 'react-router-dom';

type ProductBreadcrumbsProps = {
  product: {
    category: string;
    title: string;
  }
}

export default function ProductBreadcrumbs({ product }: ProductBreadcrumbsProps) {
  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
        </li>
        <li>
          <span className="text-gray-400 mx-2">/</span>
        </li>
        <li>
          <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
        </li>
        <li>
          <span className="text-gray-400 mx-2">/</span>
        </li>
        <li>
          <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-gray-700">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
        </li>
        <li>
          <span className="text-gray-400 mx-2">/</span>
        </li>
        <li className="text-gray-900">{product.title}</li>
      </ol>
    </nav>
  );
}
