import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/stats"
        );

        const data = await response.json();

        if (response.ok) {
          setStats(data);
        } else {
          console.error(
            "Failed to fetch dashboard stats"
          );
        }
      } catch (error) {
        console.error(
          "Dashboard stats error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your ShopEasy store
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Products */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center mb-4">
              <i className="fa-solid fa-box text-pink-600 text-xl"></i>
            </div>

            <p className="text-gray-500 text-sm">
              Products
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              {loading ? "..." : stats.products}
            </h2>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <i className="fa-solid fa-cart-shopping text-blue-600 text-xl"></i>
            </div>

            <p className="text-gray-500 text-sm">
              Orders
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              {loading ? "..." : stats.orders}
            </h2>
          </div>

          {/* Customers */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <i className="fa-solid fa-users text-green-600 text-xl"></i>
            </div>

            <p className="text-gray-500 text-sm">
              Customers
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              {loading ? "..." : stats.customers}
            </h2>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <i className="fa-solid fa-indian-rupee-sign text-purple-600 text-xl"></i>
            </div>

            <p className="text-gray-500 text-sm">
              Revenue
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              {loading
                ? "..."
                : `₹${stats.revenue.toLocaleString("en-IN")}`}
            </h2>
          </div>
        </div>

        {/* Management */}
        <div className="bg-white rounded-xl shadow-sm p-6">

          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Store Management
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Products */}
            <Link
              to="/admin/products"
              className="border border-gray-200 rounded-xl p-5 hover:border-pink-400 hover:shadow-md transition"
            >
              <i className="fa-solid fa-box-open text-pink-600 text-2xl mb-3"></i>

              <h3 className="font-semibold text-gray-800">
                Manage Products
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                View, add, edit and delete products.
              </p>
            </Link>

            {/* Orders */}
            <Link
              to="/admin/orders"
              className="border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition"
            >
              <i className="fa-solid fa-truck text-blue-600 text-2xl mb-3"></i>

              <h3 className="font-semibold text-gray-800">
                Manage Orders
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                View orders and update order status.
              </p>
            </Link>

            {/* Add Product */}
            <Link
              to="/admin/products/add"
              className="border border-gray-200 rounded-xl p-5 hover:border-green-400 hover:shadow-md transition"
            >
              <i className="fa-solid fa-plus text-green-600 text-2xl mb-3"></i>

              <h3 className="font-semibold text-gray-800">
                Add Product
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Add a new product to ShopEasy.
              </p>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;