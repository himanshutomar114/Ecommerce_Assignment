// pages/CartPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import ControlsBar from "../components/ControlsBar";
import EmptyState from "../components/EmptyState";
import ProductGrid from "../components/ProductGrid";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../lib/api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartItems(data.items || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Update quantity of a product
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const updated = await updateCartItem(itemId, newQuantity);
      setCartItems(updated.items || []);
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  // Remove a product from cart
  const removeItem = async (itemId) => {
    try {
      const updated = await removeCartItem(itemId);
      setCartItems(updated.items || []);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // Clear cart
  const clearAll = async () => {
    try {
      await clearCart();
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // Navigate back to home
  const handleBackToHome = () => {
    navigate('/product');
  };

  // Sort cart items (use cartItem.item)
  const sortedCartItems = useMemo(() => {
    let sorted = [...cartItems];
    sorted.sort((a, b) => {
      const itemA = a.item || {};
      const itemB = b.item || {};

      switch (sortBy) {
        case "price-low":
          return (itemA.price || 0) - (itemB.price || 0);
        case "price-high":
          return (itemB.price || 0) - (itemA.price || 0);
        case "rating":
          return (itemB.rating || 0) - (itemA.rating || 0);
        default:
          return (itemA.name || "").localeCompare(itemB.name || "");
      }
    });
    return sorted;
  }, [cartItems, sortBy]);

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, ci) => acc + (ci.item?.price || 0) * ci.quantity,
      0
    );
  }, [cartItems]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-8">
        {/* Back to Home Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={handleBackToHome}
            className="flex items-center bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 py-3 px-6 rounded-xl font-medium border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 group"
          >
            <svg 
              className="w-5 h-5 mr-2 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your Cart
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review your selected items before checkout
          </p>
        </div>

        {cartItems.length === 0 ? (
          <EmptyState clearFilters={clearAll} />
        ) : (
          <div className="grid lg:grid-cols-4 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-3">
              <ControlsBar
                showFilters={false}
                filteredCount={sortedCartItems.length}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />

              {/* ✅ pass products as array of product objects */}
              <ProductGrid
                products={sortedCartItems.map((ci) => ({
                  ...ci.item,
                  quantity: ci.quantity,
                }))}
                viewMode={viewMode}
                cartMode={true}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />

              <div className="flex justify-end mt-6">
                <button
                  onClick={clearAll}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-gray-800">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 transition-colors"
                onClick={() => alert("Proceeding to checkout...")}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;