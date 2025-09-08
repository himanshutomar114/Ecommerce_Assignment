import React from "react";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";

const ControlsBar = ({ showFilters, setShowFilters, filteredCount, sortBy, setSortBy, viewMode, setViewMode }) => (
  <div className="flex items-center justify-between mb-6">
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition-all border border-gray-200"
    >
      <SlidersHorizontal className="w-4 h-4" /> {showFilters ? "Hide" : "Show"} Filters
    </button>

    <div className="flex items-center gap-4">
      <p className="text-gray-600">{filteredCount} products found</p>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-2 border rounded-lg bg-white"
      >
        <option value="name">Name</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Rating</option>
        <option value="reviews">Most Reviewed</option>
      </select>

      <div className="flex border rounded-lg overflow-hidden">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "bg-white"}`}
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "bg-white"}`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

export default ControlsBar;
