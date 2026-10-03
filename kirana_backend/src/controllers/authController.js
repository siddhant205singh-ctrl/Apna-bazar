const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      address: user.address
    }
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, phone, email, password, address } = req.body;

    // Check if phone exists
    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({ success: false, message: 'Phone number already registered' });
    }

    if (email) {
       const emailExists = await User.findOne({ email });
       if (emailExists) {
           return res.status(400).json({ success: false, message: 'Email already registered' });
       }
    }

    // Create user
    const userData = { name, phone, passwordHash: password, address };
    if (email && email.trim() !== '') {
      userData.email = email;
    }
    
    const user = await User.create(userData);

    sendTokenResponse(user, 201, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { phone, email, password } = req.body;

    // Validate email/phone & password
    if ((!phone && !email) || !password) {
      return res.status(400).json({ success: false, message: 'Please provide phone/email and password' });
    }

    // Check for user
    let user;
    if (phone) {
        user = await User.findOne({ phone }).select('+passwordHash');
    } else if (email) {
        user = await User.findOne({ email }).select('+passwordHash');
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};
