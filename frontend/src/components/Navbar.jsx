import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import categories from "../data/categories";

function Navbar() {
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Categories hidden from navbar
  const hiddenCategories = [
    "Popular",
    "Home & Kitchen",
    "Electronics",
  ];

  const visibleCategories = categories.filter(
    (category) => !hiddenCategories.includes(category.name)
  );

  // ================= SEARCH =================
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      navigate("/products");
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(search.trim())}`
    );

    setSearch("");
  };

  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {
      await logout();

      setShowProfileMenu(false);
      setActiveCategory(null);

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ================= DESKTOP CATEGORY =================
  const handleDesktopCategoryClick = (categoryName) => {
    navigate(
      `/products?category=${encodeURIComponent(categoryName)}`
    );

    setActiveCategory(null);
  };

  // ================= MOBILE CATEGORY =================
  const handleMobileCategoryClick = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
    }
  };

  // ================= SUBCATEGORY =================
  const handleLinkClick = (
    categoryName,
    sectionTitle,
    link
  ) => {
    navigate(
      `/products?category=${encodeURIComponent(
        categoryName
      )}&subcategory=${encodeURIComponent(link)}`
    );

    setActiveCategory(null);
  };

  // ================= DROPDOWN POSITION =================
  const getDropdownPosition = (categoryName) => {
    switch (categoryName) {
      case "Women":
        return "left-0";

      case "Men":
        return "left-[-80px]";

      case "Girls":
        return "left-1/2 -translate-x-1/2";

      case "Boys":
        return "left-1/2 -translate-x-1/2";

      case "Toys":
        return "right-[-80px]";

      case "Beauty":
        return "right-0";

      default:
        return "left-1/2 -translate-x-1/2";
    }
  };

  return (
    <header className="relative z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* =================================================
          MAIN NAVBAR
      ================================================= */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center gap-4">
          {/* LOGO */}
          <Link
            to="/"
            className="shrink-0 text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          >
            ShopEasy
          </Link>

          {/* =================================================
              DESKTOP SEARCH
          ================================================= */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl"
          >
            <div className="relative w-full">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-gray-100 border border-transparent rounded-lg py-2.5 pl-11 pr-4 text-sm outline-none focus:bg-white focus:border-pink-400 transition"
              />
            </div>
          </form>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}
          <div className="ml-auto flex items-center gap-5">
            {/* =================================================
                PROFILE
            ================================================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowProfileMenu(!showProfileMenu)
                }
                className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition"
              >
                <i className="fa-regular fa-user text-lg"></i>

                <span className="hidden sm:block text-sm font-medium max-w-28 truncate">
                  {user
                    ? user.displayName ||
                      user.email?.split("@")[0]
                    : "Profile"}
                </span>

                <i
                  className={`fa-solid ${
                    showProfileMenu
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                  } text-xs`}
                ></i>
              </button>

              {/* =================================================
                  PROFILE DROPDOWN
              ================================================= */}
              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-[200]">
                  {user ? (
                    <>
                      {/* USER INFO */}
                      <div className="px-4 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                            <i className="fa-solid fa-user text-pink-600"></i>
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {user.displayName ||
                                "ShopEasy User"}
                            </p>

                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* MY ORDERS */}
                      <Link
                        to="/orders"
                        onClick={() =>
                          setShowProfileMenu(false)
                        }
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <i className="fa-solid fa-box"></i>
                        My Orders
                      </Link>

                      {/* LOGOUT */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      {/* WELCOME */}
                      <div className="px-4 py-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">
                          Welcome to ShopEasy
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Login to manage your account.
                        </p>
                      </div>

                      {/* LOGIN */}
                      <Link
                        to="/login"
                        onClick={() =>
                          setShowProfileMenu(false)
                        }
                        className="block mx-4 my-3 text-center bg-pink-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-pink-700 transition"
                      >
                        Login
                      </Link>

                      {/* SIGNUP */}
                      <Link
                        to="/signup"
                        onClick={() =>
                          setShowProfileMenu(false)
                        }
                        className="block text-center pb-4 text-sm text-pink-600 font-medium"
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* =================================================
                CART
            ================================================= */}
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="relative text-gray-700 hover:text-pink-600 transition"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 min-w-5 h-5 px-1 bg-pink-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* =================================================
            MOBILE SEARCH
        ================================================= */}
        <form
          onSubmit={handleSearch}
          className="md:hidden pb-3"
        >
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products..."
              className="w-full bg-gray-100 border border-transparent rounded-lg py-2.5 pl-11 pr-4 text-sm outline-none focus:bg-white focus:border-pink-400 transition"
            />
          </div>
        </form>
      </div>

      {/* =================================================
          DESKTOP CATEGORY BAR
      ================================================= */}
      <div className="hidden md:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around h-12">
            {visibleCategories.map((category) => (
              <div
                key={category.name}
                className="relative h-full flex items-center"
                onMouseEnter={() =>
                  setActiveCategory(category.name)
                }
                onMouseLeave={() =>
                  setActiveCategory(null)
                }
              >
                {/* CATEGORY BUTTON */}
                <button
                  type="button"
                  onClick={() =>
                    handleDesktopCategoryClick(
                      category.name
                    )
                  }
                  className="h-full text-sm font-medium text-gray-700 hover:text-pink-600 transition whitespace-nowrap"
                >
                  {category.name}
                </button>

                {/* =================================================
                    DESKTOP MEGA MENU
                ================================================= */}
                {category.sections &&
                  category.sections.length > 0 &&
                  activeCategory === category.name && (
                    <div
                      className={`absolute top-full ${getDropdownPosition(
                        category.name
                      )} bg-white border border-gray-200 rounded-xl shadow-2xl z-[999] p-6`}
                      style={{
                        width: "760px",
                        maxWidth:
                          "calc(100vw - 32px)",
                      }}
                      onMouseEnter={() =>
                        setActiveCategory(
                          category.name
                        )
                      }
                      onMouseLeave={() =>
                        setActiveCategory(null)
                      }
                    >
                      {/* DROPDOWN CONTENT */}
                      <div className="grid grid-cols-4 gap-6">
                        {category.sections.map(
                          (section) => (
                            <div
                              key={section.title}
                              className="min-w-0"
                            >
                              {/* SECTION TITLE */}
                              <h3 className="text-sm font-bold text-gray-900 mb-3 whitespace-nowrap">
                                {section.title}
                              </h3>

                              {/* LINKS */}
                              <div className="space-y-2">
                                {section.links.map(
                                  (link) => (
                                    <button
                                      type="button"
                                      key={link}
                                      onClick={() =>
                                        handleLinkClick(
                                          category.name,
                                          section.title,
                                          link
                                        )
                                      }
                                      className="block w-full text-left text-sm text-gray-600 hover:text-pink-600 transition whitespace-nowrap"
                                    >
                                      {link}
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================
          MOBILE CATEGORY SECTION
      ================================================= */}
      <div className="md:hidden border-t border-gray-100">
        <div className="px-4 py-3">
          <div className="grid grid-cols-3 gap-2">
            {visibleCategories.map((category) => (
              <button
                type="button"
                key={category.name}
                onClick={() =>
                  handleMobileCategoryClick(
                    category.name
                  )
                }
                className={`py-2.5 px-2 rounded-lg text-sm font-medium transition ${
                  activeCategory === category.name
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* =================================================
            MOBILE SUBCATEGORY PANEL
        ================================================= */}
        {activeCategory && (
          <div className="border-t border-gray-200 bg-white">
            {visibleCategories
              .filter(
                (category) =>
                  category.name === activeCategory
              )
              .map((category) => (
                <div
                  key={category.name}
                  className="px-4 py-5"
                >
                  {/* PANEL HEADER */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">
                      {category.name}
                    </h2>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveCategory(null)
                      }
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>

                  {/* MOBILE SECTIONS */}
                  <div className="grid grid-cols-2 gap-4">
                    {category.sections.map(
                      (section) => (
                        <div
                          key={section.title}
                          className="border border-gray-200 rounded-lg p-3"
                        >
                          <h3 className="text-sm font-bold text-gray-900 mb-2">
                            {section.title}
                          </h3>

                          <div className="space-y-1.5">
                            {section.links.map(
                              (link) => (
                                <button
                                  type="button"
                                  key={link}
                                  onClick={() =>
                                    handleLinkClick(
                                      category.name,
                                      section.title,
                                      link
                                    )
                                  }
                                  className="block w-full text-left text-sm text-gray-600 hover:text-pink-600"
                                >
                                  {link}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;