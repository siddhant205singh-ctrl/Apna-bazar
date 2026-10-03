const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    name_hi: String,
    price: Number,
    quantity: Number,
    unit: String,
    image: String
  }],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  deliveryType: {
    type: String,
    enum: ['home', 'pickup'],
    required: true
  },
  address: { type: String },
  paymentMethod: {
    type: String,
    enum: ['cod', 'upi'],
    required: true
  },
  notes: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Rejected'],
    default: 'Pending'
  },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
