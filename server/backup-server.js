const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Comprehensive CORS setup
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});

// Basic routes
app.get("/", (req, res) => {
  return res.json({
    status: 'success',
    message: 'Welcome to ACKO Insurance API',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: 'offline-mode'
  });
});

// Mock authentication endpoint
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  if (email && password) {
    return res.json({
      status: 'success',
      data: {
        token: 'mock-jwt-token-for-testing',
        user: {
          id: '12345',
          email: email,
          name: 'Test User'
        }
      }
    });
  } else {
    return res.status(400).json({
      status: 'error',
      message: 'Email and password are required'
    });
  }
});

// Mock registration endpoint
app.post("/auth/signup", (req, res) => {
  const userData = req.body;
  
  if (userData.email && userData.password && userData.name) {
    return res.json({
      status: 'success',
      data: {
        token: 'mock-jwt-token-for-testing',
        user: {
          id: '12345',
          email: userData.email,
          name: userData.name
        }
      }
    });
  } else {
    return res.status(400).json({
      status: 'error',
      message: 'Email, password and name are required'
    });
  }
});

// Mock car API
app.get("/cars", (req, res) => {
  return res.json({
    status: 'success',
    data: [
      { id: 1, make: 'Honda', model: 'City', year: 2020 },
      { id: 2, make: 'Maruti', model: 'Swift', year: 2021 },
      { id: 3, make: 'Hyundai', model: 'i20', year: 2019 }
    ]
  });
});

// Mock policies API
app.get("/policies", (req, res) => {
  return res.json({
    status: 'success',
    data: [
      { 
        id: 1, 
        policyNumber: 'ACKO-123456',
        vehicleType: 'car',
        vehicleDetails: { make: 'Honda', model: 'City', year: 2020 },
        premium: { totalPremium: 5000 }
      }
    ]
  });
});

app.post("/policies", (req, res) => {
  const policyData = req.body;
  return res.json({
    status: 'success',
    data: {
      id: Math.floor(100000 + Math.random() * 900000),
      ...policyData,
      createdAt: new Date().toISOString()
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Something went wrong!'
  });
});

// 404 middleware
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Start server
const port = process.env.PORT || 8081;

const server = app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
  console.log(`Server URL: http://localhost:${port}`);
}); 
 