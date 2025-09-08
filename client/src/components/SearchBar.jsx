import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="mb-8 relative max-w-2xl mx-auto">
    <input
      type="text"
      placeholder="Search products, brands..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-6 py-4 rounded-full border border-gray-200 shadow-sm 
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                 transition-all duration-300 bg-white/70 backdrop-blur-sm"
    />
    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
  </div>
);

export default SearchBar;
