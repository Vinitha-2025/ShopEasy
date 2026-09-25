import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    oldPrice: "",
    rating: "0",
    reviews: "0",
    description: "",
    image: "",
    stock: "0",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =============================
  // Handle input
  // =============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =============================
  // Add product
  // =============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://shop-easy-snowy-seven.vercel.app/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            category: formData.category,
            subcategory: formData.subcategory,
            price: Number(formData.price),
            oldPrice: Number(formData.oldPrice),
            rating: Number(formData.rating),
            reviews: Number(formData.reviews),
            description: formData.description,
            image: formData.image,
            stock: Number(formData.stock),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add product"
        );
      }

      setMessage("Product added successfully!");

      setFormData({
        name: "",
        category: "",
        subcategory: "",
        price: "",
        oldPrice: "",
        rating: "0",
        reviews: "0",
        description: "",
        image: "",
        stock: "0",
      });

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    } catch (error) {
      console.error("Add product error:", error);

      setError(
        error.message || "Unable to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ============================= */}
        {/* Header */}
        {/* ============================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Add Product
            </h1>

            <p className="text-gray-500 mt-1">
              Add a new product to ShopEasy
            </p>
          </div>

          <Link
            to="/admin/products"
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-lg font-semibold text-center transition"
          >
            ← Back to Products
          </Link>

        </div>

        {/* ============================= */}
        {/* Success Message */}
        {/* ============================= */}

        {message && (
          <div className="bg-green-100 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
            <i className="fa-solid fa-circle-check mr-2"></i>
            {message}
          </div>
        )}

        {/* ============================= */}
        {/* Error Message */}
        {/* ============================= */}

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {error}
          </div>
        )}

        {/* ============================= */}
        {/* Form */}
        {/* ============================= */}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-6 sm:p-8"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Product Name */}

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                required
              />

            </div>

            {/* Category */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Example: Women"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                required
              />

            </div>

            {/* Subcategory */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subcategory
              </label>

              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                placeholder="Example: Sarees"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                required
              />

            </div>

            {/* Price */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="799"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                required
              />

            </div>

            {/* Old Price */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Old Price
              </label>

              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="999"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                required
              />

            </div>

            {/* Rating */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
              />

            </div>

            {/* Reviews */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reviews
              </label>

              <input
                type="number"
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
              />

            </div>

            {/* Stock */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="50"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
              />

            </div>

            {/* Image */}

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/product.jpg"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                required
              />

            </div>

            {/* Description */}

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500 resize-none"
                required
              />

            </div>

          </div>

          {/* ============================= */}
          {/* Buttons */}
          {/* ============================= */}

          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            <Link
              to="/admin/products"
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg text-center transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  Adding Product...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-plus mr-2"></i>
                  Add Product
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;