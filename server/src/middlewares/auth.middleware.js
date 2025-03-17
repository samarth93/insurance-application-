const jwt = require('jsonwebtoken');
require('dotenv').config();

// Secret key for JWT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'acko-secret-key';

// Verify token middleware
const verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization;
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Access denied. No token provided.' 
    });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET_KEY);
    
    // Add user to request
    req.user = decoded;
    
    // Continue
    next();
  } catch (error) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Invalid token.' 
    });
  }
};

// Generate token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      name: user.name
    }, 
    JWT_SECRET_KEY, 
    { expiresIn: '7d' }
  );
};

module.exports = {
  verifyToken,
  generateToken
}; 