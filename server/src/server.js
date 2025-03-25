const express = require("express");
const connect = require("./config/db");
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Controllers
const carController = require("./controllers/car.controller");
const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");
const policyController = require("./controllers/policy.controller");

// Health check endpoint for frontend availability detection
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
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
    message: 'Welcome to ACKO API',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// 404 middleware
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
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
const port = process.env.PORT || 8080;

// Use a flag to prevent multiple connection attempts during restart
let isConnecting = false;

// Handle server errors
const server = app.listen(port, async () => {
  if (!isConnecting) {
    isConnecting = true;
    try {
      await connect();
      console.log(`Database connected successfully`);
    } catch (err) {
      console.error("Database connection error:", err.message);
      console.log("Server running without database connection");
    } finally {
      isConnecting = false;
    }
  }
  console.log(`Server connected to port: ${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Trying port ${parseInt(port) + 1}`);
    server.close();
    app.listen(parseInt(port) + 1, () => {
      console.log(`Server connected to port: ${parseInt(port) + 1}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
