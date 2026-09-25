import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createUserWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);

      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError("Unable to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 flex items-center justify-center px-4 py-10">

      {/* Background Decorations */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-pink-400/30 rounded-full blur-2xl"></div>

      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-400/30 rounded-full blur-2xl"></div>

      <div className="absolute top-1/3 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>

      {/* Signup Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl shadow-2xl p-6 md:p-8">

          {/* Logo */}
          <div className="text-center mb-7">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-bag-shopping text-2xl text-white"></i>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              ShopEasy
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Create your account and start shopping.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              <i className="fa-solid fa-circle-exclamation mr-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup}>
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-11 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-11 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-11 pr-11 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-11 pr-11 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition"
                  title={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  <i
                    className={`fa-solid ${
                      showConfirmPassword
                        ? "fa-eye-slash"
                        : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-pink-700 hover:to-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-user-plus mr-2"></i>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Login */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-pink-600 hover:text-purple-600 transition"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
            <i className="fa-solid fa-shield-halved"></i>
            Secure Firebase Authentication
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;