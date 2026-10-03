const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkUpdateProducts
} = require('../controllers/productController');
const { protect, ownerOnly } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, ownerOnly, createProduct);

router.post('/bulk-update', protect, ownerOnly, bulkUpdateProducts);

router.route('/:id')
  .get(getProduct)
  .put(protect, ownerOnly, updateProduct)
  .delete(protect, ownerOnly, deleteProduct);

module.exports = router;
