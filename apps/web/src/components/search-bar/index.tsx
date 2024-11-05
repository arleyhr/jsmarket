import SearchButton from "../buttons/search";
import CategorySelect from "../category-select";

const SearchBar = () => (
  <div className="flex-1 mx-8 max-w-4xl">
    <div className="flex">
      <CategorySelect />
      <input
        type="text"
        className="flex-1 h-10 px-4 bg-white focus:outline-none text-black"
        placeholder="Search..."
      />
      <SearchButton />
    </div>
  </div>
);

export default SearchBar;
