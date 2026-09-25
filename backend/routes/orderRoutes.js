const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// ========================================
// CREATE NEW ORDER
// POST /api/orders
// ========================================

router.post("/", async (req, res) => {
  try {
    console.log("Received order:", req.body);

    const {
      customer,
      products,
      totalAmount,
      razorpayOrderId,
      razorpayPaymentId,
      paymentStatus,
    } = req.body;

    const order = new Order({
      customer,
      products,
      totalAmount,
      razorpayOrderId,
      razorpayPaymentId,
      paymentStatus,
      orderStatus: "Pending",
    });

    const savedOrder = await order.save();

    console.log(
      "Order saved:",
      savedOrder._id
    );

    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error(
      "Order save error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to save order",
      error: error.message,
    });
  }
});

// ========================================
// GET ALL ORDERS
// GET /api/orders
// ADMIN ONLY
// ========================================

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(
      "Get orders error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// ========================================
// GET CUSTOMER ORDERS
// GET /api/orders/customer/:email
// ========================================

router.get(
  "/customer/:email",
  async (req, res) => {
    try {
      const email = decodeURIComponent(
        req.params.email
      );

      console.log(
        "Fetching orders for:",
        email
      );

      const orders = await Order.find({
        "customer.email": email,
      }).sort({
        createdAt: -1,
      });

      console.log(
        "Customer orders found:",
        orders.length
      );

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      console.error(
        "Get customer orders error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Failed to fetch customer orders",
        error: error.message,
      });
    }
  }
);

// ========================================
// UPDATE ORDER STATUS
// PUT /api/orders/:id/status
// ADMIN ONLY
// ========================================

router.put(
  "/:id/status",
  async (req, res) => {
    try {
      const { orderStatus } = req.body;

      const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ];

      if (
        !allowedStatuses.includes(
          orderStatus
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status",
        });
      }

      const updatedOrder =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            orderStatus: orderStatus,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Order status updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.error(
        "Update order status error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update order status",
        error: error.message,
      });
    }
  }
);

module.exports = router;