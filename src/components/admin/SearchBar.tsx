import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", className }) => {
  return (
    <div className={`relative w-full max-w-sm ${className || ""}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-100 pl-10 pr-4"
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
    </div>
  );
};

export default SearchBar;
