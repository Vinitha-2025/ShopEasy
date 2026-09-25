import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-pink-500">
              ShopEasy
            </h2>

            <p className="text-gray-400 text-sm mt-3">
              Your destination for trendy fashion, beauty, toys and
              everyday essentials.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold mb-4">
              Quick Links
            </h3>

            <div className="space-y-2 text-sm text-gray-400">
              <Link
                to="/"
                className="block hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="block hover:text-white transition"
              >
                Products
              </Link>

              <p className="hover:text-white cursor-pointer">
                About Us
              </p>

              {/* CONTACT */}
              <Link
                to="/contact"
                className="block hover:text-white transition"
              >
                Contact
              </Link>

              {/* ADMIN LOGIN */}
              <Link
                to="/admin/login"
                className="block hover:text-pink-400 transition"
              >
                Admin Login
              </Link>
            </div>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="font-semibold mb-4">
              Customer Service
            </h3>

            <div className="space-y-2 text-sm text-gray-400">
              <p className="hover:text-white cursor-pointer">
                Help Center
              </p>

              <p className="hover:text-white cursor-pointer">
                Returns
              </p>

              <p className="hover:text-white cursor-pointer">
                Shipping
              </p>

              <p className="hover:text-white cursor-pointer">
                Privacy Policy
              </p>
            </div>
          </div>

          {/* SOCIAL MEDIA */}
          <div>
            <h3 className="font-semibold mb-4">
              Follow Us
            </h3>

            <div className="flex gap-3">
              <button className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition">
                <i className="fa-brands fa-facebook-f"></i>
              </button>

              <button className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition">
                <i className="fa-brands fa-instagram"></i>
              </button>

              <button className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition">
                <i className="fa-brands fa-twitter"></i>
              </button>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          © 2026 ShopEasy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;