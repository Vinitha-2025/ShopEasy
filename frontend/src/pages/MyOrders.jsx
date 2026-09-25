import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const user = auth.currentUser;

        console.log(
          "Firebase user:",
          user
        );

        if (!user) {
          setError(
            "Please login to view your orders."
          );
          setLoading(false);
          return;
        }

        console.log(
          "Customer email:",
          user.email
        );

        const email = encodeURIComponent(
          user.email
        );

        const response = await fetch(
          `https://shop-easy-snowy-seven.vercel.app/api/orders/customer/${email}`
        );

        const data = await response.json();

        console.log(
          "My Orders API response:",
          data
        );

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Failed to fetch orders"
          );
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error(
          "Fetch orders error:",
          error
        );

        setError(
          "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-red-500 mb-4">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <div className="text-5xl mb-4">
              🛍️
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Orders Yet
            </h2>

            <p className="text-gray-500">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow p-6"
              >
                {/* Order Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4 mb-5">
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
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <span className="text-green-600 font-semibold">
                      {order.paymentStatus ||
                        "Paid"}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Status
                    </p>

                    <span className="text-pink-600 font-semibold">
                      {order.orderStatus ||
                        "Pending"}
                    </span>
                  </div>
                </div>

                {/* Products */}

                <div className="space-y-4">
                  {order.products?.map(
                    (product, index) => (
                      <div
                        key={
                          product.productId ||
                          index
                        }
                        className="flex items-center gap-4"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {product.name}
                          </h3>

                          <p className="text-gray-500 text-sm">
                            Quantity:{" "}
                            {product.quantity}
                          </p>

                          <p className="text-gray-700 font-medium">
                            ₹{product.price}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Total */}

                <div className="border-t mt-5 pt-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-700">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-pink-600">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;