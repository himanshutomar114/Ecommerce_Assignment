import React, { useState } from 'react';
import { ShoppingBag, Star, Truck, Shield, Headphones, ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EcommerceFrontPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 129.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center",
      rating: 4.8,
      reviews: 256
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center",
      rating: 4.9,
      reviews: 432
    },
    {
      id: 3,
      name: "Premium Sneakers",
      price: 159.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
      rating: 4.7,
      reviews: 189
    }
  ];

  const categories = [
    { name: "Electronics", icon: "📱", count: "500+ items" },
    { name: "Fashion", icon: "👕", count: "800+ items" },
    { name: "Home & Garden", icon: "🏠", count: "350+ items" },
    { name: "Sports", icon: "⚽", count: "420+ items" }
  ];

  const handleSignIn = () => {
   navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
    };

    const handleListingPage = () => {  
        navigate('/product');
        };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopVibe
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Products</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Categories</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-6 py-2 text-blue-600 hover:text-blue-700 font-semibold border border-blue-600 hover:border-blue-700 rounded-xl transition-all duration-300 hover:scale-105"
              onClick={handleSignIn}
              >
                Sign In
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2">Products</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2">Categories</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2">About</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2">Contact</a>
                <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-100">
                  <button className="px-6 py-2 text-blue-600 font-semibold border border-blue-600 rounded-xl">
                    Sign In
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Shop Smart,
                  </span>
                  <br />
                  <span className="text-gray-800">Live Better</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Discover amazing products at unbeatable prices. From electronics to fashion, 
                  we have everything you need with fast, free delivery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                onClick={handleListingPage}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center">
                  <span>Start Shopping</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                onClick={handleListingPage}
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-105">
                  Browse Categories
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">50K+</div>
                  <div className="text-gray-600 text-sm">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">10K+</div>
                  <div className="text-gray-600 text-sm">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">99%</div>
                  <div className="text-gray-600 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center"
                alt="Shopping Experience"
                className="relative z-10 w-full rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose ShopVibe?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best shopping experience with top-notch service and quality products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Free Delivery</h3>
              <p className="text-gray-600">Free shipping on orders over $50. Fast and reliable delivery nationwide.</p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Secure Shopping</h3>
              <p className="text-gray-600">Your data and payments are protected with enterprise-level security.</p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support to help you with any questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Explore our wide range of product categories</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Check out our most popular items this week</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Sale
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                      <span className="text-lg text-gray-400 line-through ml-2">${product.originalPrice}</span>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter for exclusive deals and latest products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-none focus:ring-4 focus:ring-white/30 text-gray-800 placeholder-gray-500"
            />
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ShopVibe</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your one-stop destination for quality products at amazing prices. 
                Shop with confidence and style.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">About Us</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Contact</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">FAQ</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Shipping Info</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Electronics</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Fashion</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Home & Garden</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Sports</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Help Center</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Returns</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2025 ShopVibe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceFrontPage;