const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// =============================
// Get all products
// GET /api/products
// =============================

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

// =============================
// Add new product
// POST /api/products
// =============================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      price,
      oldPrice,
      rating,
      reviews,
      description,
      image,
      stock,
    } = req.body;

    const product = new Product({
      name,
      category,
      subcategory,
      price,
      oldPrice,
      rating,
      reviews,
      description,
      image,
      stock,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);

    res.status(500).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
});

// =============================
// Get products by category
// GET /api/products/category/:category
// =============================

router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(
      "Get category products error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch category products",
      error: error.message,
    });
  }
});

// =============================
// Get products by subcategory
// GET /api/products/subcategory/:subcategory
// =============================

router.get(
  "/subcategory/:subcategory",
  async (req, res) => {
    try {
      const products = await Product.find({
        subcategory: req.params.subcategory,
      });

      res.status(200).json(products);
    } catch (error) {
      console.error(
        "Get subcategory products error:",
        error
      );

      res.status(500).json({
        message: "Failed to fetch subcategory products",
        error: error.message,
      });
    }
  }
);

// =============================
// Get single product
// GET /api/products/:id
// =============================

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(
      "Get single product error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});

// =============================
// Update product
// PUT /api/products/:id
// =============================

router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      price,
      oldPrice,
      rating,
      reviews,
      description,
      image,
      stock,
    } = req.body;

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          category,
          subcategory,
          price,
          oldPrice,
          rating,
          reviews,
          description,
          image,
          stock,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
});

// =============================
// Delete product
// DELETE /api/products/:id
// =============================

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct =
      await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
});

module.exports = router;