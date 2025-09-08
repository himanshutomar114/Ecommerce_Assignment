import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../lib/api";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    category: "",
    rating: "",
    reviews: "",
    image: "",
    inStock: true,
    tags: "",
    trending: false,
    quickView: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        brand: form.brand,
        price: form.price ? parseFloat(form.price) : 0,
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : 0,
        category: form.category || "Uncategorized",
        rating: form.rating ? parseFloat(form.rating) : 0,
        reviews: form.reviews ? parseInt(form.reviews) : 0,
        image: form.image || "https://via.placeholder.com/400",
        inStock: form.inStock,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        trending: form.trending,
        quickView: form.quickView,
      };

      await createProduct(payload);
      alert("✅ Product added!");
      // Navigate back to ProductListing and trigger refresh
      navigate("/");
    } catch (err) {
      console.error("Failed to add product:", err.response?.data || err.message);
      alert("❌ Error adding product: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add New Product</h2>

        {[
          "name",
          "brand",
          "price",
          "originalPrice",
          "category",
          "rating",
          "reviews",
          "image",
          "tags",
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        ))}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="inStock"
            checked={form.inStock}
            onChange={handleChange}
          />
          In Stock
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="trending"
            checked={form.trending}
            onChange={handleChange}
          />
          Trending
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="quickView"
            checked={form.quickView}
            onChange={handleChange}
          />
          Quick View
        </label>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
