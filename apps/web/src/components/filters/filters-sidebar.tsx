import Rating from "../products/rating";

type FiltersSidebarProps = {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  selectedRatings: number[];
  onRatingChange: (rating: number) => void;
  showDiscounted: boolean;
  onDiscountChange: (checked: boolean) => void;
}

export default function FiltersSidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  selectedRatings,
  onRatingChange,
  showDiscounted,
  onDiscountChange
}: FiltersSidebarProps) {
  return (
    <div className="w-64 min-h-screen bg-gray-100 p-4 border-r border-gray-300">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Categories</h2>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="h-4 w-4 text-amber-300 rounded border-gray-300 focus:ring-amber-300"
              />
              <label htmlFor={category} className="ml-2 text-sm text-gray-600">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Rating</h2>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center">
              <input
                type="checkbox"
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onChange={() => onRatingChange(rating)}
                className="h-4 w-4 text-amber-300 rounded border-gray-300 focus:ring-amber-300"
              />
              <label
                htmlFor={`rating-${rating}`}
                className="ml-2 flex items-center text-sm text-gray-600"
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
              onChange={(e) => onDiscountChange(e.target.checked)}
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
