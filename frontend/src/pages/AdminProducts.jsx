import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState("");
  const [message, setMessage] = useState("");

  // =============================
  // Fetch all products
  // =============================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://shop-easy-snowy-seven.vercel.app/api/products"
      );

      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      } else {
        setError(
          data.message || "Failed to load products"
        );
      }
    } catch (error) {
      console.error("Fetch products error:", error);

      setError(
        "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =============================
  // Delete product
  // =============================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(id);
      setError("");
      setMessage("");

      const response = await fetch(
        `https://shop-easy-snowy-seven.vercel.app/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product"
        );
      }

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id !== id
        )
      );

      setMessage("Product deleted successfully!");
    } catch (error) {
      console.error("Delete product error:", error);

      setError(
        error.message ||
          "Unable to delete product"
      );
    } finally {
      setDeleteLoading("");
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
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ============================= */}
        {/* Header */}
        {/* ============================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Products
            </h1>

            <p className="text-gray-500 mt-1">
              View and manage all ShopEasy products
            </p>
          </div>

          <Link
            to="/admin/products/add"
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-lg font-semibold text-center transition"
          >
            + Add Product
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
        {/* Error */}
        {/* ============================= */}

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>

              <span>{error}</span>
            </div>
          </div>
        )}

        {/* ============================= */}
        {/* Product Count */}
        {/* ============================= */}

        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

          <p className="text-gray-500 text-sm">
            Total Products
          </p>

          <p className="text-2xl font-bold text-gray-800 mt-1">
            {products.length}
          </p>

        </div>

        {/* ============================= */}
        {/* No Products */}
        {/* ============================= */}

        {products.length === 0 ? (

          <div className="bg-white rounded-xl shadow-sm p-10 text-center">

            <i className="fa-solid fa-box-open text-gray-400 text-4xl mb-4"></i>

            <h2 className="text-xl font-semibold text-gray-700">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              Add products to your store.
            </p>

          </div>

        ) : (

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            {/* ============================= */}
            {/* Desktop Table */}
            {/* ============================= */}

            <div className="hidden md:block overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50 border-b">

                  <tr>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Product
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Category
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Subcategory
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Price
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Rating
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {products.map((product) => (

                    <tr
                      key={product._id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >

                      {/* Product */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-4">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 object-cover rounded-lg border"
                          />

                          <div>

                            <p className="font-semibold text-gray-800">
                              {product.name}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              ID: {product._id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Category */}

                      <td className="px-6 py-4 text-gray-600">
                        {product.category || "—"}
                      </td>

                      {/* Subcategory */}

                      <td className="px-6 py-4 text-gray-600">
                        {product.subcategory || "—"}
                      </td>

                      {/* Price */}

                      <td className="px-6 py-4 font-semibold text-gray-800">
                        ₹{product.price}
                      </td>

                      {/* Rating */}

                      <td className="px-6 py-4">

                        <span className="text-yellow-500">
                          ★
                        </span>{" "}

                        {product.rating || "—"}

                      </td>

                      {/* Actions */}

                      <td className="px-6 py-4">

                        <div className="flex gap-2">

                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(product._id)
                            }
                            disabled={
                              deleteLoading === product._id
                            }
                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition disabled:opacity-50"
                          >
                            {deleteLoading === product._id ? (
                              <>
                                <i className="fa-solid fa-spinner fa-spin mr-1"></i>
                                Deleting...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* ============================= */}
            {/* Mobile Cards */}
            {/* ============================= */}

            <div className="md:hidden divide-y">

              {products.map((product) => (

                <div
                  key={product._id}
                  className="p-4"
                >

                  <div className="flex gap-4">

                    {/* Image */}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg border flex-shrink-0"
                    />

                    {/* Details */}

                    <div className="flex-1 min-w-0">

                      <h3 className="font-semibold text-gray-800">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {product.category || "—"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {product.subcategory || "—"}
                      </p>

                      <p className="font-bold text-gray-800 mt-2">
                        ₹{product.price}
                      </p>

                      <p className="text-sm mt-1">

                        <span className="text-yellow-500">
                          ★
                        </span>{" "}

                        {product.rating || "—"}

                      </p>

                    </div>

                  </div>

                  {/* Mobile Actions */}

                  <div className="flex gap-2 mt-4">

                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="flex-1 text-center px-3 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      disabled={
                        deleteLoading === product._id
                      }
                      className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition disabled:opacity-50"
                    >
                      {deleteLoading === product._id ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin mr-1"></i>
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>
    </div>
  );
};

export default AdminProducts;