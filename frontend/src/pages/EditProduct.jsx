import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    oldPrice: "",
    rating: "",
    reviews: "",
    description: "",
    image: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // =============================
  // Fetch product
  // =============================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch product"
          );
        }

        setFormData({
          name: data.name || "",
          category: data.category || "",
          subcategory: data.subcategory || "",
          price: data.price || "",
          oldPrice: data.oldPrice || "",
          rating: data.rating || "",
          reviews: data.reviews || "",
          description: data.description || "",
          image: data.image || "",
          stock: data.stock || "",
        });
      } catch (error) {
        console.error(
          "Fetch product error:",
          error
        );

        setError(
          error.message ||
            "Unable to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
  // Update product
  // =============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            oldPrice: Number(formData.oldPrice),
            rating: Number(formData.rating),
            reviews: Number(formData.reviews),
            stock: Number(formData.stock),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update product"
        );
      }

      setMessage(
        "Product updated successfully!"
      );

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    } catch (error) {
      console.error(
        "Update product error:",
        error
      );

      setError(
        error.message ||
          "Unable to update product"
      );
    } finally {
      setSaving(false);
    }
  };

  // =============================
  // Loading
  // =============================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-pink-600 text-3xl mb-4"></i>

          <p className="text-gray-600 text-lg">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // =============================
  // Error loading product
  // =============================

  if (error && !formData.name) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md w-full">
          <i className="fa-solid fa-circle-exclamation text-red-500 text-4xl mb-4"></i>

          <h2 className="text-xl font-semibold text-gray-800">
            Failed to load product
          </h2>

          <p className="text-red-500 mt-2">
            {error}
          </p>

          <button
            onClick={() =>
              navigate("/admin/products")
            }
            className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-lg font-semibold"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ============================= */}
        {/* Header */}
        {/* ============================= */}

        <div className="mb-6">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/products")
            }
            className="text-gray-600 hover:text-pink-600 mb-4"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Products
          </button>

          <h1 className="text-3xl font-bold text-gray-800">
            Edit Product
          </h1>

          <p className="text-gray-500 mt-1">
            Update product information
          </p>

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
        {/* Edit Form */}
        {/* ============================= */}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                required
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Image */}

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Image Preview */}

            {formData.image && (
              <div className="md:col-span-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Image Preview
                </p>

                <img
                  src={formData.image}
                  alt={formData.name}
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}

            {/* Description */}

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              ></textarea>
            </div>

          </div>

          {/* ============================= */}
          {/* Buttons */}
          {/* ============================= */}

          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              {saving ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  Updating...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-floppy-disk mr-2"></i>
                  Update Product
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/products")
              }
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default EditProduct;