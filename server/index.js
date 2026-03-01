const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Product = require("./models/Product");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows the server to accept JSON data from your Admin form

// This line allows your website to see the images in the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Miorah Database Connected Successfully"))
  .catch((err) => console.error("❌ Database Connection Error:", err));

// --- MULTER CONFIGURATION ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Saves as: 17123456789-artpiece.jpg
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Basic Test Route
app.get("/", (req, res) => {
  res.send("Miorah Crafts API is running...");
});

app.get("/api/products/:id", async (req, res) => {
  try {
    // We use the ID directly from the URL params
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    // This triggers if the ID string format is slightly off
    console.error("ID Error:", err);
    res.status(500).json({ message: "Invalid ID format" });
  }
});

// --- GET ALL PRODUCTS ROUTE ---
app.get("/api/products", async (req, res) => {
  try {
    // This finds every document in the products collection
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Could not fetch archive" });
  }
});

// --- THE POST ROUTE ---
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const { name, size, price, category, description } = req.body;
    
    // Safety check: ensure a file was actually uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image for the art." });
    }
    
    // req.file is created by Multer. filename is the new name we gave it above.
    const imagePath = `/uploads/${req.file.filename}`;

    const newProduct = new Product({
      name,
      size,
      price,
      category,
      description,
      image: imagePath,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- THE DELETE ROUTE ---
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is live on http://localhost:${PORT}`);
});
