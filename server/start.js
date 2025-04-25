// Direct server start script
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// CORS and JSON middleware
app.use(cors());
app.use(express.json());

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
    database: 'offline' // We're not connecting to DB for this test
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
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
}); 
 