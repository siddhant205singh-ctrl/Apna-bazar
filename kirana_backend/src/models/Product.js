const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  name_hi: { type: String },
  category: {
    type: String,
    enum: ['fruits-veg', 'dairy', 'staples', 'snacks', 'beverages', 'household'],
    required: true
  },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  unit: { type: String, required: true },
  unit_hi: { type: String },
  image: { type: String },
  description: { type: String },
  description_hi: { type: String },
  rating: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  tag: { type: String },
  tag_hi: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
