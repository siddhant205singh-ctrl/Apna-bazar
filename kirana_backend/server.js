const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json());

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('join_owner_room', () => {
    socket.join('owner-room');
    console.log(`Socket ${socket.id} joined owner-room`);
  });

  socket.on('join_customer_room', ({ customerId }) => {
    if (customerId) {
      socket.join(`customer_${customerId}`);
      console.log(`Socket ${socket.id} joined customer_${customerId}`);
    }
  });

  socket.on('track_order', ({ orderId }) => {
    if (orderId) {
      socket.join(`order_${orderId}`);
      console.log(`Socket ${socket.id} joined order_${orderId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Make io accessible to routers
app.set('io', io);

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/products', require('./src/routes/products'));
app.use('/api/orders', require('./src/routes/orders'));
app.use('/api/dashboard', require('./src/routes/dashboard'));

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = { app, server, io };
