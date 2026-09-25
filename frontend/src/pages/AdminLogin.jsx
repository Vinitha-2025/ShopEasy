import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (
      email === "vinimary17@gmail.com" &&
      password === "171203"
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
    } else {
      setError("Invalid admin email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* ============================= */}
        {/* Header */}
        {/* ============================= */}

        <div className="text-center mb-8">

          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-user-shield text-pink-600 text-2xl"></i>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-1">
            Login to manage ShopEasy
          </p>

        </div>

        {/* ============================= */}
        {/* Error Message */}
        {/* ============================= */}

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* ============================= */}
        {/* Login Form */}
        {/* ============================= */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              required
            />
          </div>

          {/* Password */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              required
            />
          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;