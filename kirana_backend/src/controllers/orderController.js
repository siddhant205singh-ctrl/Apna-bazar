const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const { items, deliveryType, address, paymentMethod, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items' });
    }

    let subtotal = 0;
    let discount = 0;
    
    // Validate products and calculate prices
    const orderItems = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const product = await Product.findById(item.product);
        
        if (!product) {
             return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
        }
        
        const itemPrice = product.price;
        const itemOriginalPrice = product.originalPrice || product.price;
        
        subtotal += itemPrice * item.quantity;
        discount += (itemOriginalPrice - itemPrice) * item.quantity;
        
        orderItems.push({
            product: product._id,
            name: product.name,
            name_hi: product.name_hi,
            price: itemPrice,
            quantity: item.quantity,
            unit: product.unit,
            image: product.image
        });
    }

    // Delivery Fee logic
    const deliveryFee = subtotal >= 299 ? 0 : 39;
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      customer: req.user._id,
      items: orderItems,
      subtotal,
      discount,
      deliveryFee,
      total,
      deliveryType,
      address,
      paymentMethod,
      notes,
      status: 'Pending',
      statusHistory: [{ status: 'Pending' }]
    });

    const populatedOrder = await Order.findById(order._id).populate('customer', 'name phone');

    // Emit Socket.io event to owner
    const io = req.app.get('io');
    if (io) {
        io.to('owner-room').emit('new_order', populatedOrder);
    }

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Owner
exports.getOrders = async (req, res, next) => {
  try {
    const { date, status } = req.query;
    let query = {};
    
    if (status) {
        query.status = status;
    }
    
    if (date === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        query.createdAt = { $gte: today };
    }

    const orders = await Order.find(query)
      .populate('customer', 'name phone email address')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer', 'name phone email address');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Make sure user is order owner or is store owner
    if (order.customer._id.toString() !== req.user.id && req.user.role !== 'owner') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Owner
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    const validStatuses = ['Pending', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Rejected'];
    if (!validStatuses.includes(status)) {
         return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    order.status = status;
    order.statusHistory.push({ status, timestamp: new Date() });
    
    await order.save();
    
    // Emit socket event
    const io = req.app.get('io');
    if (io) {
        const payload = { orderId: order._id, status, timestamp: new Date() };
        io.to(`order_${order._id}`).emit('order_status_updated', payload);
        io.to(`customer_${order.customer}`).emit('order_status_updated', payload);
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Accept order
// @route   PUT /api/orders/:id/accept
// @access  Private/Owner
exports.acceptOrder = async (req, res, next) => {
  req.body.status = 'Accepted';
  exports.updateOrderStatus(req, res, next);
};

// @desc    Reject order
// @route   PUT /api/orders/:id/reject
// @access  Private/Owner
exports.rejectOrder = async (req, res, next) => {
  // Can save reason if needed, but per requirements status='Rejected'
  req.body.status = 'Rejected';
  // Notes: if there's a reason, we might want to store it in notes or history.
  if (req.body.reason) {
      const order = await Order.findById(req.params.id);
      if (order) {
          order.notes = order.notes ? order.notes + ` | Rejection Reason: ${req.body.reason}` : `Rejection Reason: ${req.body.reason}`;
          await order.save();
      }
  }
  exports.updateOrderStatus(req, res, next);
};
