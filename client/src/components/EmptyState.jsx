import React from "react";
import { Package } from "lucide-react";

const EmptyState = ({ clearFilters }) => (
  <div className="text-center py-16">
    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
    <p className="text-gray-500 mb-4">Try adjusting your filters or search term</p>
    <button
      onClick={clearFilters}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Clear Filters
    </button>
  </div>
);

export default EmptyState;
