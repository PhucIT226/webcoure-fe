import { FaSearch } from "react-icons/fa";
import type { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", value, onChange }) => {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input input-bordered w-full pl-10 pr-4"
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
    </div>
  );
};

export default SearchBar;
