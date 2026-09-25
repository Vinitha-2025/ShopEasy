import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { auth } from "../firebase";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Calculate totals
  // -----------------------------

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 49;

  const discount =
    subtotal >= 999 ? Math.round(subtotal * 0.1) : 0;

  const grandTotal = subtotal + deliveryCharge - discount;

  // -----------------------------
  // Handle input changes
  // -----------------------------

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------
  // Load Razorpay
  // -----------------------------

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Razorpay is already loaded
      if (typeof window.Razorpay === "function") {
        resolve(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      // Script already exists but may still be loading
      if (existingScript) {
        const checkRazorpay = () => {
          if (typeof window.Razorpay === "function") {
            resolve(true);
          } else {
            resolve(false);
          }
        };

        existingScript.addEventListener(
          "load",
          checkRazorpay,
          { once: true }
        );

        existingScript.addEventListener(
          "error",
          () => resolve(false),
          { once: true }
        );

        // In case the script loaded before the listener
        setTimeout(() => {
          if (typeof window.Razorpay === "function") {
            resolve(true);
          }
        }, 500);

        return;
      }

      // Create Razorpay script
      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.async = true;

      script.onload = () => {
        if (typeof window.Razorpay === "function") {
          resolve(true);
        } else {
          resolve(false);
        }
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // -----------------------------
  // Start payment
  // -----------------------------

  const handlePayment = async () => {
    setError("");

    // Check cart
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Check Firebase login
    const user = auth.currentUser;

    if (!user) {
      setError("Please login before placing your order.");
      return;
    }

    // Validate name
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Validate address
    if (!formData.address.trim()) {
      setError("Please enter your address.");
      return;
    }

    // Validate city
    if (!formData.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    // Validate state
    if (!formData.state.trim()) {
      setError("Please enter your state.");
      return;
    }

    // Validate pincode
    if (!formData.pincode.trim()) {
      setError("Please enter your pincode.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setLoading(true);

      // -----------------------------
      // Load Razorpay script
      // -----------------------------

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        throw new Error(
          "Razorpay failed to load. Please check your internet connection."
        );
      }

      // Extra safety check
      if (typeof window.Razorpay !== "function") {
        throw new Error(
          "Razorpay checkout failed to initialize. Please refresh the page and try again."
        );
      }

      // -----------------------------
      // Create Razorpay order
      // -----------------------------

      const response = await fetch(
        "https://shop-easy-snowy-seven.vercel.app/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: grandTotal,
          }),
        }
      );

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error(
          "Payment API Response:",
          responseText
        );

        throw new Error(
          "Payment server did not return valid JSON."
        );
      }

      if (!response.ok || !data.success || !data.order) {
        throw new Error(
          data.message ||
            "Failed to create Razorpay order."
        );
      }

      // -----------------------------
      // Razorpay key
      // -----------------------------

      const razorpayKey =
        import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        throw new Error(
          "Razorpay key is missing. Check your .env file."
        );
      }

      // -----------------------------
      // Razorpay options
      // -----------------------------

      const options = {
        key: razorpayKey,

        amount: data.order.amount,

        currency: data.order.currency || "INR",

        name: "ShopEasy",

        description: "ShopEasy Order Payment",

        order_id: data.order.id,

        prefill: {
          name: formData.name,
          email: user.email || "",
          contact: formData.phone,
        },

        notes: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },

        theme: {
          color: "#ec4899",
        },

        // -----------------------------
        // PAYMENT SUCCESS
        // -----------------------------

        handler: async function (paymentResponse) {
          try {
            console.log("Payment Successful");

            console.log(
              "Razorpay Payment ID:",
              paymentResponse.razorpay_payment_id
            );

            console.log(
              "Razorpay Order ID:",
              paymentResponse.razorpay_order_id
            );

            console.log(
              "Razorpay Signature:",
              paymentResponse.razorpay_signature
            );

            // -----------------------------
            // Prepare products
            // -----------------------------

            const products = cartItems.map((item) => ({
              productId: item._id,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: item.quantity,
            }));

            // -----------------------------
            // Prepare order data
            // -----------------------------

            const orderData = {
              customer: {
                ...formData,

                // Firebase logged-in user's email
                email: auth.currentUser?.email || "",
              },

              products: products,

              totalAmount: grandTotal,

              razorpayOrderId:
                paymentResponse.razorpay_order_id,

              razorpayPaymentId:
                paymentResponse.razorpay_payment_id,

              paymentStatus: "Paid",
            };

            console.log(
              "Saving order:",
              orderData
            );

            // -----------------------------
            // Save order to MongoDB
            // -----------------------------

            const orderResponse = await fetch(
              "https://shop-easy-snowy-seven.vercel.app/api/orders",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify(orderData),
              }
            );

            const orderResponseText =
              await orderResponse.text();

            let orderDataResponse;

            try {
              orderDataResponse = JSON.parse(
                orderResponseText
              );
            } catch (parseError) {
              console.error(
                "Order API Response:",
                orderResponseText
              );

              throw new Error(
                "Order server did not return valid JSON."
              );
            }

            // -----------------------------
            // Check order save response
            // -----------------------------

            if (
              !orderResponse.ok ||
              !orderDataResponse.success
            ) {
              throw new Error(
                orderDataResponse.message ||
                  "Failed to save order."
              );
            }

            console.log(
              "Order Saved Successfully:",
              orderDataResponse.order
            );

            // -----------------------------
            // Payment + order complete
            // -----------------------------

            setLoading(false);

            navigate("/order-success");
          } catch (error) {
            console.error(
              "Order Save Error:",
              error
            );

            setError(
              error.message ||
                "Payment was successful, but we could not save your order. Please contact support."
            );

            setLoading(false);
          }
        },

        // -----------------------------
        // PAYMENT FAILED
        // -----------------------------

        modal: {
          ondismiss: function () {
            console.log(
              "Razorpay payment window closed."
            );

            setLoading(false);
          },
        },
      };

      // -----------------------------
      // Open Razorpay
      // -----------------------------

      console.log(
        "Opening Razorpay..."
      );

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment Failed:",
            response.error
          );

          setError(
            response.error?.description ||
              "Payment failed. Please try again."
          );

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Payment Error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while processing payment."
      );

      setLoading(false);
    }
  };

  // -----------------------------
  // JSX
  // -----------------------------

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Checkout
        </h1>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ============================= */}
          {/* CUSTOMER DETAILS */}
          {/* ============================= */}

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Delivery Details
            </h2>

            <div className="space-y-4">
              {/* Name */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Phone */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  maxLength="10"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Address */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* City */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* State */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Pincode */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  maxLength="6"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>

          {/* ============================= */}
          {/* ORDER SUMMARY */}
          {/* ============================= */}

          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Order Summary
            </h2>

            {/* Cart Items */}

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div>
                      <h3 className="font-medium text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        ₹{item.price} ×{" "}
                        {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold text-gray-800">
                    ₹
                    {item.price *
                      item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtotal */}

            <div className="flex justify-between text-gray-700 mb-3">
              <span>Subtotal</span>

              <span>
                ₹{subtotal}
              </span>
            </div>

            {/* Delivery */}

            <div className="flex justify-between text-gray-700 mb-3">
              <span>Delivery</span>

              <span>
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge}`}
              </span>
            </div>

            {/* Discount */}

            {discount > 0 && (
              <div className="flex justify-between text-green-600 mb-3">
                <span>Discount</span>

                <span>
                  -₹{discount}
                </span>
              </div>
            )}

            {/* Divider */}

            <div className="border-t my-4"></div>

            {/* Grand Total */}

            <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
              <span>Total</span>

              <span>
                ₹{grandTotal}
              </span>
            </div>

            {/* Payment Button */}

            <button
              onClick={handlePayment}
              disabled={
                loading ||
                cartItems.length === 0
              }
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                loading ||
                cartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              {loading
                ? "Processing..."
                : `Pay ₹${grandTotal}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;