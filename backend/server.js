const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

require("dotenv").config();

// Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Models
const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();

app.use(cors());
app.use(express.json());

// ========================================
// HOME
// ========================================

app.get("/", (req, res) => {
  res.send("ShopEasy Backend is Running");
});

// ========================================
// API ROUTES
// ========================================

app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

// ========================================
// ADMIN DASHBOARD STATISTICS
// GET /api/admin/stats
// ========================================

app.get("/api/admin/stats", async (req, res) => {
  try {
    // ------------------------------------
    // Total Products
    // ------------------------------------

    const products = await Product.countDocuments();

    // ------------------------------------
    // Total Orders
    // ------------------------------------

    const orders = await Order.countDocuments();

    // ------------------------------------
    // Get All Orders
    // ------------------------------------

    const allOrders = await Order.find();

    // ------------------------------------
    // Unique Customers
    // ------------------------------------

    const customerSet = new Set();

    allOrders.forEach((order) => {
      if (order.customer?.phone) {
        customerSet.add(order.customer.phone);
      }
    });

    const customers = customerSet.size;

    // ------------------------------------
    // Total Revenue
    // Only Paid Orders
    // ------------------------------------

    const revenue = allOrders.reduce((total, order) => {
      if (order.paymentStatus !== "Paid") {
        return total;
      }

      return total + Number(order.totalAmount || 0);
    }, 0);

    // ------------------------------------
    // Send Statistics
    // ------------------------------------

    res.status(200).json({
      success: true,
      products,
      orders,
      customers,
      revenue,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics",
      error: error.message,
    });
  }
});

// ========================================
// MONGODB CONNECTION
// ========================================

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    family: 4,
  })
  .then(() => {
    console.log("MongoDB Connected");

    // ====================================
    // START SERVER
    // ====================================

    app.listen(5000, () => {
      console.log(
        "Server running on http://localhost:5000"
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection error:",
      error
    );
  });