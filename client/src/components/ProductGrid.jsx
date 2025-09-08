import React from "react";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";

const ProductGrid = ({ products, viewMode, onAddToCart }) =>
  viewMode === "grid" ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product._id || index}
          product={product}
          onAddToCart={() => onAddToCart(product._id)}
        />
      ))}
    </div>
  ) : (
    <div className="space-y-4">
      {products.map((product, index) => (
        <ProductListItem
          key={product._id || index}
          product={product}
          onAddToCart={() => onAddToCart(product._id)}
        />
      ))}
    </div>
  );

export default ProductGrid;
