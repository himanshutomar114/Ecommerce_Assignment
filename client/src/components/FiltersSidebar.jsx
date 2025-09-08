import React from "react";
import { Filter, RefreshCw } from "lucide-react";
import FilterToggle from "./FilterToggle";
import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RatingFilter";

const FiltersSidebar = ({
  categories,
  brands,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  showInStock,
  setShowInStock,
  clearFilters,
}) => (
  <div className="w-72 flex-shrink-0">
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-800">
          <Filter className="w-5 h-5" /> Filters
        </h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <RefreshCw className="w-4 h-4" /> Clear
        </button>
      </div>

      <div className="space-y-4">
        <FilterToggle title="Category">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </FilterToggle>

        <FilterToggle title="Brand">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </FilterToggle>

        <PriceRangeFilter priceRange={priceRange} setPriceRange={setPriceRange} />
        <RatingFilter minRating={minRating} setMinRating={setMinRating} />

        <FilterToggle title="Availability">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showInStock}
              onChange={(e) => setShowInStock(e.target.checked)}
            />
            In Stock Only
          </label>
        </FilterToggle>
      </div>
    </div>
  </div>
);

export default FiltersSidebar;
