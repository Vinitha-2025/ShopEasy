import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";

import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);

  const [error, setError] = useState("");

  // Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);

        setError("Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product?.subcategory) {
        setRelatedProducts([]);
        setRelatedLoading(false);
        return;
      }

      try {
        setRelatedLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/products/subcategory/${encodeURIComponent(
            product.subcategory
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch related products");
        }

        const data = await response.json();

        // Remove current product
        const filteredProducts = data.filter(
          (item) => item._id !== product._id
        );

        // Show first 4 related products
        setRelatedProducts(filteredProducts.slice(0, 4));
      } catch (error) {
        console.error("Error fetching related products:", error);

        setRelatedProducts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>

          <p className="text-gray-500 mt-3">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <i className="fa-solid fa-circle-exclamation text-4xl text-red-500"></i>

        <p className="text-red-500 text-lg mt-4">
          {error || "Product not found"}
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  // Add product to cart
  const handleAddToCart = () => {
    addToCart(product);
  };

  // Buy Now
  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition"
      >
        <i className="fa-solid fa-arrow-left"></i>

        Back to Products
      </button>

      {/* Product Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-xl overflow-hidden h-[400px] md:h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
              <span className="bg-green-600 text-white text-sm px-3 py-1 rounded">
                ★ {product.rating}
              </span>

              <span className="text-gray-500">
                {product.reviews} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-5">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>

              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="mt-5 space-y-2 text-sm text-gray-600">
              {product.category && (
                <p>
                  <span className="font-semibold text-gray-800">
                    Category:
                  </span>{" "}
                  {product.category}
                </p>
              )}

              {product.subcategory && (
                <p>
                  <span className="font-semibold text-gray-800">
                    Subcategory:
                  </span>{" "}
                  {product.subcategory}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {product.description ||
                  "This product is designed with quality and comfort in mind. Perfect for your everyday needs."}
              </p>
            </div>

            {/* Delivery */}
            <div className="mt-6 flex items-center gap-2 text-sm text-green-600">
              <i className="fa-solid fa-truck"></i>

              <span>Free Delivery</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                <i className="fa-solid fa-cart-shopping mr-2"></i>

                Add to Cart
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                <i className="fa-solid fa-bolt mr-2"></i>

                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              You May Also Like
            </h2>

            {product.subcategory && (
              <p className="text-sm text-gray-500 mt-1">
                More products from {product.subcategory}
              </p>
            )}
          </div>
        </div>

        {/* Related Products Loading */}
        {relatedLoading && (
          <div className="flex justify-center py-10">
            <div className="text-center">
              <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-600"></i>

              <p className="text-gray-500 mt-2">
                Loading related products...
              </p>
            </div>
          </div>
        )}

        {/* Related Products */}
        {!relatedLoading && relatedProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
              />
            ))}
          </div>
        )}

        {/* No Related Products */}
        {!relatedLoading && relatedProducts.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <i className="fa-solid fa-box-open text-3xl text-gray-400"></i>

            <p className="text-gray-500 mt-3">
              No related products available.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductDetails;