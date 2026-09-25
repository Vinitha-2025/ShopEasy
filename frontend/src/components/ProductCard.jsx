import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const [favourite, setFavourite] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300 cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />

        {/* Favourite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFavourite(!favourite);
          }}
          className="absolute top-3 left-3 w-9 h-9 bg-white/50 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white/60 hover:scale-110 transition"
        >
          <i
            className={`fa-${
              favourite ? "solid" : "regular"
            } fa-heart ${
              favourite ? "text-red-500" : "text-gray-700"
            } text-lg`}
          ></i>
        </button>
      </div>

      {/* Product Details */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 truncate">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-semibold text-gray-900">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
            ★ {product.rating}
          </span>

          <span className="text-xs text-gray-500">
            {product.reviews} Reviews
          </span>
        </div>

        {/* Delivery */}
        <p className="text-xs text-gray-500 mt-2">
          Free Delivery
        </p>
      </div>
    </div>
  );
}

export default ProductCard;