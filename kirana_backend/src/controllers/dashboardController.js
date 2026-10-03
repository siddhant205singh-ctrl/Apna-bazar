const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private/Owner
exports.getStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      todayOrdersList,
      pendingOrdersCount,
      totalProducts,
      totalCustomers,
      recentOrders
    ] = await Promise.all([
      Order.find({ createdAt: { $gte: today } }),
      Order.countDocuments({ status: 'Pending' }),
      Product.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Order.find().sort('-createdAt').limit(5).populate('customer', 'name phone')
    ]);

    const todayOrders = todayOrdersList.length;
    const todayRevenue = todayOrdersList.reduce((acc, order) => {
        // Only count accepted/delivered towards revenue
        if (order.status !== 'Rejected') {
            return acc + order.total;
        }
        return acc;
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        todayOrders,
        todayRevenue,
        pendingOrders: pendingOrdersCount,
        totalProducts,
        totalCustomers,
        recentOrders
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get customers list
// @route   GET /api/dashboard/customers
// @access  Private/Owner
exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await User.find({ role: 'customer' }).select('-passwordHash');
    
    // This could be optimized with aggregation, but for simplicity we fetch all and calculate
    const customerData = [];
    
    for (const customer of customers) {
        const orders = await Order.find({ customer: customer._id });
        const totalSpent = orders.reduce((acc, order) => {
            if (order.status !== 'Rejected') {
                return acc + order.total;
            }
            return acc;
        }, 0);
        
        customerData.push({
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
            createdAt: customer.createdAt,
            orderCount: orders.length,
            totalSpent
        });
    }

    res.status(200).json({
      success: true,
      data: customerData
    });
  } catch (err) {
    next(err);
  }
};
