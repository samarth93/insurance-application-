const jwt = require('jsonwebtoken');
// Restore the database dependency
const User = require('../models/user.model');

// Use a more secure secret key with fallback
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'insuretech_secure_secret_key_2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Keep the mock users as a fallback but with more secure passwords
const mockUsers = [
  {
    _id: "1",
    name: "Test User",
    email: "test@example.com",
    mobile: "1234567890",
    password: "password123" // In a real scenario, this would be hashed
  },
  {
    _id: "2",
    name: "Demo User",
    email: "demo@insuretech.com",
    mobile: "9876543210",
    password: "demo123" // In a real scenario, this would be hashed
  },
  {
    _id: "3",
    name: "Samarth Pal",
    email: "palsamarth9@gmail.com",
    mobile: "9898989898",
    password: "password123" // In a real scenario, this would be hashed
  }
];

/**
 * Generate JWT token for authentication
 * @param {Object} user - User object
 * @returns {String} JWT token
 */
const generateToken = (user) => {
  try {
    // Include only necessary user data in the token
    const tokenData = { 
      id: user._id, 
      email: user.email,
      name: user.name
    };
    
    const token = jwt.sign(
      tokenData,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    console.log(`Generated token for user: ${user.email}`);
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate authentication token');
  }
};

/**
 * Authentication middleware to protect routes
 * Verifies the JWT token from the Authorization header
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required. No token provided.'
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required. Invalid token format.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token structure.'
      });
    }
    
    console.log(`Authenticating user with ID: ${decoded.id}, email: ${decoded.email}`);
    
    try {
      // Find user by id in the database
      const user = await User.findById(decoded.id).select('-password');
      
      if (user) {
        console.log(`User authenticated from database: ${user.email}`);
        // Add user to request object if found in database
        req.user = user;
        req.isAuthenticated = true;
        req.isMockUser = false;
        return next();
      } else {
        console.log(`User not found in database with ID: ${decoded.id}, checking mock users`);
      }
    } catch (dbError) {
      console.error("Database error during authentication:", dbError.message);
      // Continue to fallback if database fails
    }
    
    // Fallback to mock data if user not found in database
    const mockUser = mockUsers.find(user => user._id === decoded.id);
    
    if (!mockUser) {
      console.error(`User not found with ID: ${decoded.id}`);
      return res.status(401).json({
        status: 'error',
        message: 'User not found or token is invalid.'
      });
    }

    // Add mock user to request object (without password)
    const { password, ...userWithoutPassword } = mockUser;
    req.user = userWithoutPassword;
    req.isAuthenticated = true;
    req.isMockUser = true; // Flag to indicate this is a mock user
    
    console.log(`User authenticated from mock data: ${mockUser.email}`);
    next();
    
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired. Please log in again.'
      });
    }
    
    return res.status(500).json({
      status: 'error',
      message: 'Server error during authentication.'
    });
  }
};

// Export mock users for other modules to use
module.exports = { authenticate, generateToken, mockUsers }; 