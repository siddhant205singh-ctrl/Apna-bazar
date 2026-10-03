const express = require('express');
const {
  createOrder,
  getOrders,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  acceptOrder,
  rejectOrder
} = require('../controllers/orderController');
const { protect, ownerOnly } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, ownerOnly, getOrders);

router.get('/my', protect, getMyOrders);

router.get('/:id', protect, getOrder);

router.put('/:id/status', protect, ownerOnly, updateOrderStatus);
router.put('/:id/accept', protect, ownerOnly, acceptOrder);
router.put('/:id/reject', protect, ownerOnly, rejectOrder);

module.exports = router;
