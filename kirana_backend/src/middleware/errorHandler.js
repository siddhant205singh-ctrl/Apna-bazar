const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = { message };
    return res.status(404).json({ success: false, message: error.message });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message };
    return res.status(400).json({ success: false, message: error.message });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message };
    return res.status(400).json({ success: false, message: error.message });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
     return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
