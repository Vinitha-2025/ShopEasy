import React from "react";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import Contact from "./pages/Contact";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminOrders from "./pages/AdminOrders";

import ProtectedRoute from "./components/ProtectedRoute";

import { CartProvider } from "./context/CartContext";

function App() {
  const location = useLocation();

  // =============================
  // Auth pages
  // =============================

  const authPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  // =============================
  // Admin pages
  // =============================

  const adminPage =
    location.pathname.startsWith("/admin");

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* ============================= */}
        {/* Navbar */}
        {/* ============================= */}

        {!authPage && !adminPage && <Navbar />}

        {/* ============================= */}
        {/* Main */}
        {/* ============================= */}

        <main className="flex-1">
          <Routes>
            {/* ============================= */}
            {/* PUBLIC ROUTES */}
            {/* ============================= */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* ============================= */}
            {/* CONTACT */}
            {/* ============================= */}

            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* ============================= */}
            {/* AUTH ROUTES */}
            {/* ============================= */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            {/* ============================= */}
            {/* CHECKOUT */}
            {/* ============================= */}

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* ============================= */}
            {/* ORDER SUCCESS */}
            {/* ============================= */}

            <Route
              path="/order-success"
              element={<OrderSuccess />}
            />

            {/* ============================= */}
            {/* MY ORDERS */}
            {/* ============================= */}

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />

            {/* ============================= */}
            {/* ADMIN LOGIN */}
            {/* ============================= */}

            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />

            {/* ============================= */}
            {/* ADMIN DASHBOARD */}
            {/* ============================= */}

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            {/* ============================= */}
            {/* ADMIN PRODUCTS */}
            {/* ============================= */}

            <Route
              path="/admin/products"
              element={<AdminProducts />}
            />

            {/* ============================= */}
            {/* ADD PRODUCT */}
            {/* ============================= */}

            <Route
              path="/admin/products/add"
              element={<AddProduct />}
            />

            {/* ============================= */}
            {/* EDIT PRODUCT */}
            {/* ============================= */}

            <Route
              path="/admin/products/edit/:id"
              element={<EditProduct />}
            />

            {/* ============================= */}
            {/* ADMIN ORDERS */}
            {/* ============================= */}

            <Route
              path="/admin/orders"
              element={<AdminOrders />}
            />
          </Routes>
        </main>

        {/* ============================= */}
        {/* Footer */}
        {/* ============================= */}

        {!authPage && !adminPage && <Footer />}
      </div>
    </CartProvider>
  );
}

export default App;