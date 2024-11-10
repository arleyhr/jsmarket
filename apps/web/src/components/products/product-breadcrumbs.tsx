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
      <ol className="flex flex-wrap items-center gap-2 text-sm leading-none">
        <li className="hidden sm:block">
          <a href="/" className="text-gray-500 hover:text-gray-700 leading-none">Home</a>
        </li>
        <li className="hidden sm:block">
          <span className="text-gray-400 leading-none">/</span>
        </li>
        <li>
          <Link to="/products" className="text-gray-500 hover:text-gray-700 leading-none">Products</Link>
        </li>
        <li>
          <span className="text-gray-400 leading-none">/</span>
        </li>
        <li>
          <Link
            to={`/products?category=${product.category}`}
            className="text-gray-500 hover:text-gray-700 truncate max-w-[200px] sm:max-w-none inline-block leading-none"
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
        </li>
        <li>
          <span className="text-gray-400 leading-none">/</span>
        </li>
        <li className="text-gray-900 truncate max-w-[140px] sm:max-w-none leading-none">{product.title}</li>
      </ol>
    </nav>
  );
}
