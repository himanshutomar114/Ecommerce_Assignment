import React, { useState, useContext } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import StarRating from "./StarRating";
import { UserContext } from "../context/UserContext";
import { deleteProduct } from "../lib/api";

const ProductCard = ({ product, onAddToCart, onDeleteSuccess }) => {
  const [qty, setQty] = useState(1);
  const { user } = useContext(UserContext);
  const [deleting, setDeleting] = useState(false);

  const increaseQty = () => setQty((prev) => prev + 1);
  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const handleWishlist = () => {
    alert("❤️ Added to Wishlist!");
  };

  const handleCart = () => {
    if (typeof onAddToCart === "function") {
      onAddToCart(product._id, qty);
      alert("🛒 Product added to Cart!");
    }
  };

  const handleDeleteClick = async () => {
    if (!user || user.role !== "admin") return;

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeleting(true);
      await deleteProduct(product._id);
      alert("✅ Product deleted successfully!");
      if (typeof onDeleteSuccess === "function") {
        onDeleteSuccess(product._id); // notify parent to remove from UI
      }
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl 
                    transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />

        {product.trending && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
            Trending
          </span>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 
                        group-hover:opacity-100 transition-opacity">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="p-2 bg-white rounded-full shadow hover:bg-red-100 group/heart"
          >
            <Heart className="w-4 h-4 text-gray-600 group-hover/heart:text-red-500" />
          </button>

          {/* Cart Button */}
          <button
            onClick={handleCart}
            className="p-2 bg-white rounded-full shadow hover:bg-blue-100 group/cart"
          >
            <ShoppingCart className="w-4 h-4 text-gray-600 group-hover/cart:text-blue-600" />
          </button>

          {/* Delete Button (Admin only) */}
          {user?.role === "admin" && (
            <button
              onClick={handleDeleteClick}
              disabled={deleting}
              className={`p-2 bg-white rounded-full shadow hover:bg-red-200 group/delete ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Trash2 className="w-4 h-4 text-gray-600 group-hover/delete:text-red-600" />
            </button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={product.rating} />
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Quantity + Add to Cart */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={decreaseQty}
              className="px-2 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center border-x outline-none"
            />
            <button
              onClick={increaseQty}
              className="px-2 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <button
            onClick={handleCart}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
