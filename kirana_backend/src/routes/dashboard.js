const express = require('express');
const { getStats, getCustomers } = require('../controllers/dashboardController');
const { protect, ownerOnly } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);
router.use(ownerOnly);

router.get('/stats', getStats);
router.get('/customers', getCustomers);

module.exports = router;
