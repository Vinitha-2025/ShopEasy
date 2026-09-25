import React, { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import ProductGrid from "../components/ProductGrid";

import API from "../api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let response;

        // Search products
        if (search) {
          response = await API.get("/products");
        }
        // Subcategory products
        else if (subcategory) {
          response = await API.get(
            `/products/subcategory/${encodeURIComponent(subcategory)}`
          );
        }
        // Category products
        else if (category) {
          response = await API.get(
            `/products/category/${encodeURIComponent(category)}`
          );
        }
        // All products
        else {
          response = await API.get("/products");
        }

        let productData = response.data;

        // Search filtering
        if (search) {
          const searchText = search.toLowerCase().trim();

          productData = productData.filter((product) => {
            const productName = product.name?.toLowerCase() || "";
            const productCategory = product.category?.toLowerCase() || "";
            const productSubcategory =
              product.subcategory?.toLowerCase() || "";

            return (
              productName.includes(searchText) ||
              productCategory.includes(searchText) ||
              productSubcategory.includes(searchText)
            );
          });
        }

        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory, search]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Rating filter
    if (ratingFilter) {
      const minimumRating = Number(ratingFilter);

      result = result.filter(
        (product) => Number(product.rating) >= minimumRating
      );
    }

    // Sorting
    if (sortBy === "priceLow") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "priceHigh") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortBy === "rating") {
      result.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return result;
  }, [products, sortBy, ratingFilter]);

  // Clear filters
  const clearFilters = () => {
    setSortBy("");
    setRatingFilter("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {search
                ? `Search results for "${search}"`
                : subcategory || category || "All Products"}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {filteredProducts.length} products available
            </p>
          </div>

          {/* Filter Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:border-pink-500 hover:text-pink-600 transition"
          >
            <i className="fa-solid fa-filter"></i>
            {showFilters ? "Hide Filters" : "Filter"}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-5 sm:items-end">
            {/* Sort By */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-pink-500"
              >
                <option value="">Default</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>

            {/* Rating */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>

              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-pink-500"
              >
                <option value="">All Ratings</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
                <option value="2">2★ & above</option>
                <option value="1">1★ & above</option>
              </select>
            </div>

            {/* Clear Button */}
            <button
              type="button"
              onClick={clearFilters}
              className="px-5 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Products */}
      {loading ? (
        <div className="text-center py-20">
          <i className="fa-solid fa-spinner fa-spin text-2xl text-pink-600"></i>

          <p className="text-gray-500 mt-3">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <i className="fa-regular fa-face-frown text-4xl text-gray-400"></i>

          <p className="text-gray-500 text-lg mt-3">
            No products found.
          </p>

          {search && (
            <p className="text-gray-400 text-sm mt-2">
              Try searching for another product, category or subcategory.
            </p>
          )}

          {(sortBy || ratingFilter) && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm text-pink-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}

export default Products;