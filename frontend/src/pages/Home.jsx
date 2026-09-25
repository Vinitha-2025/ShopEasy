import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../api";

function Home() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [favorites, setFavorites] = useState([]);

  // ================= SHOP BY CATEGORY =================
  const categories = [
    {
      name: "Women",
      link: "/products?category=Women",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80",
    },
    {
      name: "Men",
      link: "/products?category=Men",
      image:
        "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500&q=80",
    },
    {
      name: "Girls",
      link: "/products?category=Girls",
      image:
        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500&q=80",
    },
    {
      name: "Beauty",
      link: "/products?search=Beauty",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
    },
    {
      name: "Toys",
      link: "/products?search=Toys",
      image:
        "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500&q=80",
    },
    {
      name: "Accessories",
      link: "/products?search=Accessories",
      image:
        "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=500&q=80",
    },
  ];

  // ================= TOP BRANDS =================
  const brands = [
    {
      name: "Nike",
      logo: "https://cdn.simpleicons.org/nike/111111",
    },
    {
      name: "Adidas",
      logo: "https://cdn.simpleicons.org/adidas/111111",
    },
    {
      name: "H&M",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
    },
    {
      name: "Zara",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
    },
  ];

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);

        const response = await API.get("/products");

        // Show only 20 products on homepage
        setProducts(response.data.slice(0, 20));
      } catch (error) {
        console.error("Error fetching home products:", error);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ================= FAVORITE =================
  const toggleFavorite = (productId) => {
    setFavorites((previousFavorites) => {
      if (previousFavorites.includes(productId)) {
        return previousFavorites.filter(
          (id) => id !== productId
        );
      }

      return [...previousFavorites, productId];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* LEFT */}
            <div>
              <p className="text-pink-600 font-semibold mb-3">
                TRENDY COLLECTION
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Shop Everything
                <span className="block text-pink-600">
                  You Love
                </span>
              </h1>

              <p className="mt-5 text-gray-600 text-base sm:text-lg max-w-lg">
                Discover fashion, beauty, toys, accessories and
                more at amazing prices.
              </p>

              <div className="flex flex-wrap gap-4 mt-7">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition shadow-lg"
                >
                  Shop Now
                  <i className="fa-solid fa-arrow-right ml-2"></i>
                </Link>

                <Link
                  to="/products"
                  className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:border-pink-500 hover:text-pink-600 transition"
                >
                  Explore
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80"
                alt="Shopping"
                className="w-full h-[280px] sm:h-[380px] object-cover rounded-2xl shadow-xl"
              />

              <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-white rounded-xl shadow-lg px-5 py-4">
                <p className="text-xs text-gray-500">
                  Special Offer
                </p>

                <p className="text-xl font-bold text-pink-600">
                  Up to 50% OFF
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SHOP BY CATEGORY
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>

            <p className="text-gray-500 mt-1">
              Find what you are looking for
            </p>
          </div>

          <Link
            to="/products"
            className="text-pink-600 font-semibold text-sm sm:text-base"
          >
            View All
            <i className="fa-solid fa-arrow-right ml-2"></i>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <div className="h-32 sm:h-40 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-3 text-center">
                <h3 className="font-semibold text-gray-800">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          DEAL BANNER
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-sm uppercase tracking-wider opacity-90">
              Limited Time Offer
            </p>

            <h2 className="text-2xl sm:text-4xl font-bold mt-2">
              Big Deals Are Here!
            </h2>

            <p className="mt-2 text-sm sm:text-base text-pink-100">
              Get amazing products at unbelievable prices.
            </p>
          </div>

          <Link
            to="/products"
            className="bg-white text-pink-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap"
          >
            Shop Deals
            <i className="fa-solid fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </section>

      {/* =====================================================
          TOP BRANDS
      ====================================================== */}
      <section className="py-12 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Top Brands
          </h2>

          <p className="text-gray-500 mt-1">
            Shop your favourite brands
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex w-max animate-brand-scroll">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="mx-3 sm:mx-5 w-36 sm:w-48 h-24 sm:h-28 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md hover:border-pink-300 transition duration-300"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-[110px] sm:max-w-[140px] max-h-[50px] sm:max-h-[60px] object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TRENDING PRODUCTS
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Trending Products
            </h2>

            <p className="text-gray-500 mt-1">
              Popular products you may love
            </p>
          </div>

          <Link
            to="/products"
            className="text-pink-600 font-semibold text-sm sm:text-base"
          >
            View All
            <i className="fa-solid fa-arrow-right ml-2"></i>
          </Link>
        </div>

        {/* LOADING */}
        {productsLoading ? (
          <div className="text-center py-16">
            <i className="fa-solid fa-spinner fa-spin text-2xl text-pink-600"></i>

            <p className="text-gray-500 mt-3">
              Loading products...
            </p>
          </div>
        ) : products.length === 0 ? (
          /* EMPTY */
          <div className="text-center py-16">
            <i className="fa-regular fa-face-frown text-4xl text-gray-400"></i>

            <p className="text-gray-500 mt-3">
              No products available.
            </p>
          </div>
        ) : (
          /* PRODUCTS */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {products.map((product) => {
              const isFavorite = favorites.includes(
                product._id
              );

              return (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group cursor-pointer block"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="relative h-48 sm:h-56 bg-gray-100 overflow-hidden">
                    <img
                      src={
                        product.image ||
                        product.images?.[0] ||
                        "https://via.placeholder.com/500"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />

                    {/* DISCOUNT */}
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {product.discount}
                      </span>
                    )}

                    {/* HEART */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        toggleFavorite(product._id);
                      }}
                      className={`absolute top-2 right-2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center transition ${
                        isFavorite
                          ? "text-pink-600"
                          : "text-gray-500 hover:text-pink-600"
                      }`}
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <i
                        className={
                          isFavorite
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }
                      ></i>
                    </button>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                      {product.name}
                    </h3>

                    {/* RATING */}
                    <div className="flex items-center gap-1 mt-2">
                      <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
                        {product.rating || "4.5"}

                        <i className="fa-solid fa-star ml-1 text-[9px]"></i>
                      </span>

                      <span className="text-xs text-gray-500">
                        Rating
                      </span>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.price}
                      </span>

                      {product.oldPrice && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          ₹{product.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* DELIVERY */}
                    <p className="text-xs text-green-600 font-medium mt-1">
                      Free Delivery
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================
          WHY SHOP WITH US
      ====================================================== */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Why Shop With Us?
            </h2>

            <p className="text-gray-500 mt-2">
              Shopping made simple and convenient
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {/* FAST DELIVERY */}
            <div className="text-center p-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xl">
                <i className="fa-solid fa-truck"></i>
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                Fast Delivery
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Get your orders delivered quickly.
              </p>
            </div>

            {/* SECURE PAYMENT */}
            <div className="text-center p-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                <i className="fa-solid fa-shield-halved"></i>
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                Secure Payment
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Safe and secure payment options.
              </p>
            </div>

            {/* EASY RETURNS */}
            <div className="text-center p-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                <i className="fa-solid fa-rotate-left"></i>
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                Easy Returns
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Hassle-free return experience.
              </p>
            </div>

            {/* SUPPORT */}
            <div className="text-center p-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
                <i className="fa-solid fa-headset"></i>
              </div>

              <h3 className="font-bold text-gray-800 mt-4">
                24/7 Support
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                We are here whenever you need us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BRAND ANIMATION
      ====================================================== */}
      <style>{`
        @keyframes brandScroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .animate-brand-scroll {
          animation: brandScroll 18s linear infinite;
        }

        .animate-brand-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default Home;