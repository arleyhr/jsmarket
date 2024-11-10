import { TCategory } from '../../queries/products';
import Rating from '../products/rating';

type FiltersSidebarProps = {
  categories: TCategory[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedRatings: number[];
  onRatingChange: (rating: number) => void;
  showDiscounted: boolean;
  onDiscountChange: (checked: boolean) => void;
};

export default function FiltersSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedRatings,
  onRatingChange,
  showDiscounted,
  onDiscountChange,
}: FiltersSidebarProps) {
  return (
    <div className="w-full lg:w-64 bg-white lg:bg-gray-100 p-4 lg:border-r lg:border-gray-300">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Categories</h2>
        <div className="space-y-2">
          <div key="all" className="flex items-center">
            <input
              type="checkbox"
              id="all"
              checked={selectedCategory === '' || selectedCategory === null}
              onChange={() => onCategoryChange('')}
              className="h-4 w-4 text-amber-300 rounded border-gray-300 focus:ring-amber-300"
            />
            <label htmlFor="all" className="ml-2 text-sm text-gray-600">
              All
            </label>
          </div>
          {categories.map(category => (
            <div key={category.slug} className="flex items-center">
              <input
                type="checkbox"
                id={category.slug}
                checked={selectedCategory === category.slug}
                onChange={() =>
                  onCategoryChange(category.slug === selectedCategory ? '' : category.slug)
                }
                className="h-4 w-4 text-amber-300 rounded border-gray-300 focus:ring-amber-300"
              />
              <label htmlFor={category.slug} className="ml-2 text-sm text-gray-600">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 opacity-50 pointer-events-none">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Rating</h2>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center opacity-50">
              <input
                type="checkbox"
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onChange={() => onRatingChange(rating)}
                className="h-4 w-4 text-gray-400 rounded border-gray-300 focus:ring-gray-300"
                disabled
              />
              <label
                htmlFor={`rating-${rating}`}
                className="ml-2 flex items-center text-sm text-gray-400"
              >
                <Rating rating={rating} />
                <span className="ml-1">or more</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Discounts</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="discount"
              checked={showDiscounted}
              onChange={e => onDiscountChange(e.target.checked)}
              className="h-4 w-4 text-amber-300 rounded border-gray-300 focus:ring-amber-300"
            />
            <label htmlFor="discount" className="ml-2 text-sm text-gray-600">
              On sale
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
