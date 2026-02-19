const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Matches "name" (e.g., "ZEWER — Diptych Collection")
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  // Matches "size" (e.g., "16” * 20” (Set of 2)")
  size: { 
    type: String, 
    required: true 
  },
  // Matches "price" (e.g., 3999)
  price: { 
    type: Number, 
    required: true 
  },
  // Matches "category" (e.g., "Wall Art")
  category: { 
    type: String, 
    required: true,
    default: "Wall Art"
  },
  // Matches "image" (e.g., "/images/ZEWER-3999.jpg")
  image: { 
    type: String, 
    required: true 
  },
  // Matches your long artisanal descriptions
  description: { 
    type: String, 
    required: true 
  },
  // Automatically tracks when you add a new piece to the archive
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Product', productSchema);