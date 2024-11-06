import { IconSearch } from "@tabler/icons-react";

const SearchButton = ({ onClick }: { onClick: () => void }) => (
  <button className="h-10 px-6 bg-amber-300 hover:bg-amber-400 rounded-r-lg flex items-center text-black" onClick={onClick}>
    <IconSearch />
  </button>
);

export default SearchButton;
