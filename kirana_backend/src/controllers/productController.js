const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    let query;

    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['sort', 'search'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Handle inStock boolean explicitly if provided
    if (reqQuery.inStock !== undefined) {
      reqQuery.inStock = reqQuery.inStock === 'true';
    }
    
    // Add regex search for name
    if (req.query.search) {
      reqQuery.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { name_hi: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    query = Product.find(reqQuery);

    // Sort
    if (req.query.sort) {
      if (req.query.sort === 'price-low') {
        query = query.sort('price');
      } else if (req.query.sort === 'price-high') {
        query = query.sort('-price');
      } else if (req.query.sort === 'rating') {
        query = query.sort('-rating');
      }
    } else {
      query = query.sort('-createdAt');
    }

    const products = await query;

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Owner
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Owner
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Owner
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Bulk update products
// @route   POST /api/products/bulk-update
// @access  Private/Owner
exports.bulkUpdateProducts = async (req, res, next) => {
  try {
    const { updates } = req.body;
    if (!updates || !Array.isArray(updates)) {
        return res.status(400).json({ success: false, message: 'Updates array is required' });
    }

    const bulkOps = updates.map(update => {
       const { id, ...fields } = update;
       return {
           updateOne: {
               filter: { _id: id },
               update: { $set: fields }
           }
       };
    });

    await Product.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: `${updates.length} products updated successfully`
    });
  } catch (err) {
    next(err);
  }
};
