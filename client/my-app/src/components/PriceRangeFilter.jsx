import React from "react";
import FilterToggle from "./FilterToggle";

const PriceRangeFilter = ({ priceRange, setPriceRange }) => (
  <FilterToggle title="Price Range">
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          className="w-24 px-2 py-1 border rounded-lg"
        />
        <span className="text-gray-500">to</span>
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="w-24 px-2 py-1 border rounded-lg"
        />
      </div>
      <input
        type="range"
        min="0"
        max="1000000000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
        className="w-full"
      />
    </div>
  </FilterToggle>
);

export default PriceRangeFilter;
