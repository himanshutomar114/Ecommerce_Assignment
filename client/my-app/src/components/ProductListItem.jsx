import React from "react";
import { ShoppingCart } from "lucide-react";
import StarRating from "./StarRating";

const ProductListItem = ({ product }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex hover:shadow-md transition-all">
    <img src={product.image} alt={product.name} className="w-48 h-48 object-cover" />
    <div className="p-6 flex-1">
      <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
      <div className="flex items-center gap-2 mb-2">
        <StarRating rating={product.rating} />
        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Category: {product.category}</p>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
        )}
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
        <ShoppingCart className="w-4 h-4" /> Add to Cart
      </button>
    </div>
  </div>
);

export default ProductListItem;
