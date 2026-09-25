import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState("");
  const [message, setMessage] = useState("");

  // =============================
  // Order status options
  // =============================

  const orderStatuses = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  // =============================
  // Fetch all orders
  // =============================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://shop-easy-snowy-seven.vercel.app/api/orders"
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setOrders(data.orders);
      } else {
        setError(
          data.message || "Failed to load orders"
        );
      }
    } catch (error) {
      console.error("Fetch orders error:", error);

      setError(
        "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =============================
  // Update order status
  // =============================

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {
    try {
      setUpdatingOrder(orderId);
      setError("");
      setMessage("");

      const response = await fetch(
        `https://shop-easy-snowy-seven.vercel.app/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderStatus: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update order status"
        );
      }

      // Update order in the current list
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: newStatus,
              }
            : order
        )
      );

      setMessage(
        "Order status updated successfully!"
      );
    } catch (error) {
      console.error(
        "Update order status error:",
        error
      );

      setError(
        error.message ||
          "Unable to update order status"
      );
    } finally {
      setUpdatingOrder("");
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
            Loading orders...
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

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Manage Orders
          </h1>

          <p className="text-gray-500 mt-1">
            View and manage all ShopEasy customer orders
          </p>

        </div>

        {/* ============================= */}
        {/* Success Message */}
        {/* ============================= */}

        {message && (
          <div className="bg-green-100 border border-green-200 text-green-700 p-4 rounded-lg mb-6">

            <div className="flex items-center gap-2">

              <i className="fa-solid fa-circle-check"></i>

              <span>{message}</span>

            </div>

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
        {/* Order Count */}
        {/* ============================= */}

        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

          <p className="text-gray-500 text-sm">
            Total Orders
          </p>

          <p className="text-2xl font-bold text-gray-800 mt-1">
            {orders.length}
          </p>

        </div>

        {/* ============================= */}
        {/* No Orders */}
        {/* ============================= */}

        {orders.length === 0 ? (

          <div className="bg-white rounded-xl shadow-sm p-10 text-center">

            <i className="fa-solid fa-box-open text-gray-400 text-4xl mb-4"></i>

            <h2 className="text-xl font-semibold text-gray-700">
              No orders found
            </h2>

            <p className="text-gray-500 mt-2">
              Customer orders will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >

                {/* ============================= */}
                {/* Order Header */}
                {/* ============================= */}

                <div className="bg-gray-50 border-b px-6 py-4">

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <p className="font-semibold text-gray-800 break-all">
                        {order._id}
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Order Date
                      </p>

                      <p className="font-medium text-gray-800">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Payment
                      </p>

                      <span
                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : order.paymentStatus === "Failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>

                    </div>

                    {/* ============================= */}
                    {/* Order Status */}
                    {/* ============================= */}

                    <div>

                      <p className="text-sm text-gray-500 mb-1">
                        Order Status
                      </p>

                      <select
                        value={
                          order.orderStatus ||
                          "Pending"
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        disabled={
                          updatingOrder ===
                          order._id
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >

                        {orderStatuses.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          )
                        )}

                      </select>

                      {updatingOrder ===
                        order._id && (
                        <p className="text-xs text-gray-500 mt-1">

                          <i className="fa-solid fa-spinner fa-spin mr-1"></i>

                          Updating...

                        </p>
                      )}

                    </div>

                  </div>

                </div>

                {/* ============================= */}
                {/* Order Body */}
                {/* ============================= */}

                <div className="p-6">

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ============================= */}
                    {/* Customer Details */}
                    {/* ============================= */}

                    <div>

                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Customer Details
                      </h3>

                      <div className="space-y-2 text-sm">

                        <p>
                          <span className="font-semibold text-gray-700">
                            Name:
                          </span>{" "}
                          {order.customer?.name ||
                            "—"}
                        </p>

                        <p>
                          <span className="font-semibold text-gray-700">
                            Phone:
                          </span>{" "}
                          {order.customer?.phone ||
                            "—"}
                        </p>

                        <p>
                          <span className="font-semibold text-gray-700">
                            Address:
                          </span>{" "}
                          {order.customer?.address ||
                            "—"}
                        </p>

                        <p>
                          <span className="font-semibold text-gray-700">
                            City:
                          </span>{" "}
                          {order.customer?.city ||
                            "—"}
                        </p>

                        <p>
                          <span className="font-semibold text-gray-700">
                            State:
                          </span>{" "}
                          {order.customer?.state ||
                            "—"}
                        </p>

                        <p>
                          <span className="font-semibold text-gray-700">
                            Pincode:
                          </span>{" "}
                          {order.customer?.pincode ||
                            "—"}
                        </p>

                      </div>

                    </div>

                    {/* ============================= */}
                    {/* Products */}
                    {/* ============================= */}

                    <div className="lg:col-span-2">

                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Ordered Products
                      </h3>

                      <div className="space-y-4">

                        {order.products?.map(
                          (product, index) => (

                            <div
                              key={
                                product.productId ||
                                index
                              }
                              className="flex gap-4 border rounded-lg p-3"
                            >

                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-20 h-20 object-cover rounded-lg border flex-shrink-0"
                              />

                              <div className="flex-1 min-w-0">

                                <h4 className="font-semibold text-gray-800">
                                  {product.name}
                                </h4>

                                <p className="text-sm text-gray-500 mt-1">
                                  Price: ₹
                                  {product.price}
                                </p>

                                <p className="text-sm text-gray-500">
                                  Quantity:{" "}
                                  {product.quantity}
                                </p>

                              </div>

                              <div className="font-semibold text-gray-800">

                                ₹
                                {(
                                  product.price *
                                  product.quantity
                                ).toLocaleString()}

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                  {/* ============================= */}
                  {/* Order Total */}
                  {/* ============================= */}

                  <div className="border-t mt-6 pt-5 flex justify-end">

                    <div className="text-right">

                      <p className="text-gray-500 text-sm">
                        Order Total
                      </p>

                      <p className="text-2xl font-bold text-gray-800">
                        ₹
                        {order.totalAmount?.toLocaleString()}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminOrders;