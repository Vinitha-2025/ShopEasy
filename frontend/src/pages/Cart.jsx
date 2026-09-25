import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Delivery charge
  const deliveryCharge = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 49;

  // 10% discount for orders of ₹999 or more
  const discount = subtotal >= 999 ? Math.round(subtotal * 0.1) : 0;

  // Final total
  const grandTotal = subtotal + deliveryCharge - discount;

  // Total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-pink-50 flex items-center justify-center">
            <i className="fa-solid fa-cart-shopping text-3xl text-pink-600"></i>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mt-5">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-2">
            Looks like you haven't added anything to your cart yet.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Shopping Cart
        </h1>

        <p className="text-gray-500 mt-1">
          {totalItems} item(s) in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-gray-900 line-clamp-2">
                        {item.name}
                      </h2>

                      {item.subcategory && (
                        <p className="text-sm text-gray-500 mt-1">
                          {item.subcategory}
                        </p>
                      )}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-400 hover:text-red-500 transition shrink-0"
                      title="Remove"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>

                  {/* Price */}
                  <div className="mt-3">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{item.price}
                    </span>

                    {item.oldPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ₹{item.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                      >
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>

                      <span className="w-10 text-center font-semibold text-gray-800">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        Item Total
                      </p>

                      <p className="font-bold text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-pink-600 font-medium hover:text-pink-700 transition"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            {/* Subtotal */}
            <div className="flex justify-between mt-6 text-gray-600">
              <span>Subtotal</span>

              <span className="font-medium text-gray-900">
                ₹{subtotal}
              </span>
            </div>

            {/* Delivery */}
            <div className="flex justify-between mt-3 text-gray-600">
              <span>Delivery</span>

              {deliveryCharge === 0 ? (
                <span className="font-medium text-green-600">
                  Free
                </span>
              ) : (
                <span className="font-medium text-gray-900">
                  ₹{deliveryCharge}
                </span>
              )}
            </div>

            {/* Discount */}
            <div className="flex justify-between mt-3 text-gray-600">
              <span>Discount</span>

              {discount > 0 ? (
                <span className="font-medium text-green-600">
                  -₹{discount}
                </span>
              ) : (
                <span className="text-gray-500">₹0</span>
              )}
            </div>

            {/* Offer Message */}
            {subtotal < 999 && (
              <div className="mt-4 p-3 bg-pink-50 rounded-lg">
                <p className="text-sm text-pink-700">
                  <i className="fa-solid fa-tag mr-2"></i>
                  Add ₹{999 - subtotal} more to get
                  <strong> FREE delivery + 10% OFF</strong>
                </p>
              </div>
            )}

            {discount > 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  <i className="fa-solid fa-circle-check mr-2"></i>
                  You saved ₹{discount} on this order!
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-5"></div>

            {/* Grand Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">
                Total
              </span>

              <span className="text-xl font-bold text-pink-600">
                ₹{grandTotal}
              </span>
            </div>

            {/* Checkout */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
            >
              Proceed to Checkout
              <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>

            {/* Security */}
            <div className="flex items-center gap-2 mt-5 text-xs text-gray-500">
              <i className="fa-solid fa-shield-halved text-green-600"></i>

              <span>Safe and secure shopping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;