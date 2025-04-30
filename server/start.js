// Direct server start script
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');
const connect = require("./src/config/db"); // Add database connection

const app = express();

// CORS and JSON middleware
app.use(cors());
app.use(express.json());

// Import controllers
const carController = require("./src/controllers/car.controller");
const authController = require("./src/controllers/auth.controller");
const policyController = require("./src/controllers/policy.controller");

// Routes
app.use("/cars", carController);
app.use("/auth", authController);
app.use("/policies", policyController);

// Basic routes
app.get("/", (req, res) => {
  return res.json({
    status: 'success',
    message: 'Welcome to ACKO API',
    version: '1.0.0'
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error and 404 middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Something went wrong!'
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Start server
const port = 8082;

const server = app.listen(port, async () => {
  try {
    await connect();
    console.log(`Database connected successfully to MongoDB Atlas`);
  } catch (err) {
    console.error("Database connection error:", err.message);
    console.log("Server running without database connection");
  }
  console.log(`Server running on port: ${port}`);
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
 