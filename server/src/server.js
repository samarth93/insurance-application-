const express = require("express");
const connect = require("./config/db");
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// More detailed CORS setup
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8082', 'http://localhost:8083', 'http://localhost:8084', '*'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours in seconds
}));

// Express JSON middleware with increased limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Log all requests for debugging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const authHeader = req.headers.authorization ? 'Auth header present' : 'No auth';
  console.log(`${timestamp} | ${req.method} ${req.url} | ${authHeader}`);
  next();
});

// Controllers
const carController = require("./controllers/car.controller");
const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");
const policyController = require("./controllers/policy.controller");

// Health check endpoint for frontend availability detection
app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStatusText = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  }[dbStatus] || 'unknown';
  
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: dbStatusText,
    version: '1.0.1'
  });
});

// Authentication test route
app.get("/auth-test", (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(200).json({
      status: 'info',
      message: 'No authentication detected',
      authenticated: false
    });
  }
  
  return res.status(200).json({
    status: 'info',
    message: 'Authentication header detected',
    authenticated: 'token_present',
    headerFormat: authHeader.startsWith('Bearer ') ? 'correct' : 'incorrect' 
  });
});

// Routes
app.use("/cars", carController);
app.use("/user", userController);
app.use("/auth", authController);
app.use("/policies", policyController);

// Home route
app.get("/", (req, res) => {
  return res.json({
    status: 'success',
    message: 'Welcome to Insuretech API',
    version: '1.0.1',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  
  // Handle different types of errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }
  
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: err.message || 'Authentication error'
    });
  }
  
  res.status(500).json({
    status: 'error',
    message: err.message || 'Something went wrong!'
  });
});

// 404 middleware
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.url}`
  });
});

// Process error handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Keep the process alive
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Keep the process alive
});

// Start server
const port = process.env.PORT || 8082;

// Use a flag to prevent multiple connection attempts during restart
let isConnecting = false;

// Handle server errors
const server = app.listen(port, async () => {
  if (!isConnecting) {
    isConnecting = true;
    try {
      await connect();
      console.log(`Database connected successfully to MongoDB Atlas`);
    } catch (err) {
      console.error("Database connection error:", err.message);
      console.log("Server running without database connection - auth will fall back to mock users");
    } finally {
      isConnecting = false;
    }
  }
  console.log(`Server running on port: ${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const newPort = parseInt(port) + 1;
    console.error(`Port ${port} is already in use. Trying port ${newPort}`);
    server.close();
    
    // Try the next port
    const newServer = app.listen(newPort, () => {
      console.log(`Server running on alternative port: ${newPort}`);
    });
    
    // Add the same error handler to the new server
    newServer.on('error', (newErr) => {
      if (newErr.code === 'EADDRINUSE') {
        const finalPort = newPort + 1;
        console.error(`Port ${newPort} is also in use. Trying one final port ${finalPort}`);
        newServer.close();
        
        // Try one final port
        app.listen(finalPort, () => {
          console.log(`Server running on final alternative port: ${finalPort}`);
        });
      } else {
        console.error('Server error:', newErr);
      }
    });
  } else {
    console.error('Server error:', err);
  }
});
