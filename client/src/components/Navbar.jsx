import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { logoutMutation } = useLogout();

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      await logoutMutation();
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleGoToCart = () => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    navigate("/cart");
  };

  return (
    <nav className="border-b shadow-lg top-0 z-50 backdrop-blur-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer group">
            <h1 className="text-xl font-bold text-blue-600">ShopVibe</h1>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">
            {/* Profile */}
            {user && (
              <button
                onClick={handleProfile}
                className="rounded-full border border-gray-300 hover:scale-105 transition-transform"
              >
                <img
                  src={user?.profilePic || '/fallback.png'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>
            )}

            {/* Cart */}
            <button
              onClick={handleGoToCart}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
            </button>

            {/* Logout */}
            {user && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">⏻</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
