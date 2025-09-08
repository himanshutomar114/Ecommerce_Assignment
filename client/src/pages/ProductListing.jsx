import React, { useState, useMemo, useEffect, useContext } from "react";

import SearchBar from "../components/SearchBar";
import FiltersSidebar from "../components/FiltersSidebar";
import ControlsBar from "../components/ControlsBar";
import EmptyState from "../components/EmptyState";
import ProductGrid from "../components/ProductGrid";
import { getProducts, addToCart, deleteProduct } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useLogout from "../hooks/useLogout";
import Navbar from "../components/Navbar";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]); 
  const [minRating, setMinRating] = useState(0);
  const [showInStock, setShowInStock] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(true);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { logoutMutation } = useLogout();

  // ✅ Load filters from localStorage
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    if (savedFilters) {
      setSearchTerm(savedFilters.searchTerm || "");
      setSelectedCategory(savedFilters.selectedCategory || "");
      setSelectedBrand(savedFilters.selectedBrand || "");
      setPriceRange(savedFilters.priceRange || [0, 1000]);
      setMinRating(savedFilters.minRating || 0);
      setShowInStock(savedFilters.showInStock || false);
    }
  }, []);

  // ✅ Save filters to localStorage
  useEffect(() => {
    localStorage.setItem(
      "filters",
      JSON.stringify({
        searchTerm,
        selectedCategory,
        selectedBrand,
        priceRange,
        minRating,
        showInStock,
      })
    );
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, minRating, showInStock]);

  // ✅ Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);

        // Dynamically update price range based on data
        if (data.length > 0) {
          const maxPrice = Math.max(...data.map((p) => p.price));
          setPriceRange([0, maxPrice]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Categories & brands from full dataset
  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];

  // ✅ Client-side filtering
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Brand
    if (selectedBrand) {
      filtered = filtered.filter((p) => p.brand === selectedBrand);
    }

    // Price Range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Rating
    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    // In Stock
    if (showInStock) {
      filtered = filtered.filter((p) => p.inStock);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return a.name.localeCompare(b.name);
      }
    });
    return filtered;
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedBrand,
    priceRange,
    minRating,
    showInStock,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange([0, Math.max(...products.map((p) => p.price), 1000)]);
    setMinRating(0);
    setShowInStock(false);
  };

  const handleAddToCart = async (productId, quantity = 1) => {
  if (!user) {
    alert("Please login first!");
    navigate("/login");
    return;
  }
  try {
    await addToCart(productId, quantity); // pass quantity here
    alert(`Added ${quantity} item(s) to cart!`);
  } catch (err) {
    console.error("Failed to add product to cart:", err);
    alert("Failed to add product to cart");
  }
};


  const handleDeleteProduct = async (productId) => {
    if (!user || user.role !== "admin") {
      alert("Only admins can delete products");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert("Product deleted!");
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product");
    }
  };

  

  if (loading) return <div className="text-center mt-20">Loading products...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12 relative">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Products
          </h1>
          
          
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for with our advanced filtering and search capabilities
          </p>
        </div>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="flex gap-8">
          {showFilters && (
            <FiltersSidebar
              categories={categories}
              brands={brands}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minRating={minRating}
              setMinRating={setMinRating}
              showInStock={showInStock}
              setShowInStock={setShowInStock}
              clearFilters={clearFilters}
            />
          )}

          <div className="flex-1">
            <ControlsBar
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              filteredCount={filteredProducts.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            {filteredProducts.length === 0 ? (
              <EmptyState clearFilters={clearFilters} />
            ) : (
              <ProductGrid
                products={filteredProducts}
                viewMode={viewMode}
                onAddToCart={handleAddToCart}
                onDeleteProduct={user?.role === "admin" ? handleDeleteProduct : null}
              />
            )}

            {user?.role === "admin" && (
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => navigate("/add-product", { state: { refresh: true } })}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition-colors"
                >
                  ➕ Add New Product
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;