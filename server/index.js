const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows the server to accept JSON data from your Admin form

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Miorah Database Connected Successfully"))
  .catch((err) => console.error("❌ Database Connection Error:", err));

// Basic Test Route
app.get('/', (req, res) => {
  res.send("Miorah Crafts API is running...");
});

// GET ROUTE: Fetch all products for the Gallery
app.get('/api/products', async (req, res) => {
  try {
    // .find() gets everything from the 'products' collection
    // .sort({ createdAt: -1 }) ensures your newest art appears first
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch archive data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is live on http://localhost:${PORT}`);
});