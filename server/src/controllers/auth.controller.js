const express = require('express');
// Restore the User model import
const User = require('../models/user.model');
const { generateToken, mockUsers } = require('../middleware/auth.middleware');
const router = express.Router();

// Input validation functions
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateRegistration = (userData) => {
  const errors = [];

  if (!userData.name || userData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!userData.email || !validateEmail(userData.email)) {
    errors.push('Valid email is required');
  }

  if (!userData.password || userData.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!userData.mobile) {
    errors.push('Mobile number is required');
  }

  return { valid: errors.length === 0, errors };
};

// Signup route
router.post('/signup', async (req, res) => {
  try {
    // Validate input
    const { valid, errors } = validateRegistration(req.body);
    if (!valid) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors
      });
    }

    // First check existing users in the database
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'User already exists with this email'
        });
      }
      
      // Create user object with trimmed values
      const userData = {
        name: req.body.name.trim(),
        email: req.body.email.toLowerCase().trim(),
        password: req.body.password,
        mobile: req.body.mobile
      };
        
      // Create new user in database
      const user = await User.create(userData);
      
      // Generate token
      const token = generateToken(user);
      
      // Return user data and token
      return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile
          },
          token
        }
      });
    } catch (dbError) {
      console.error("Database error during signup:", dbError.message);
      // Fall back to mock data if database fails
    }
    
    // Fallback to mock data
    // Check if user already exists in mock data
    const existingMockUser = mockUsers.find(user => user.email === req.body.email.toLowerCase().trim());
    
    if (existingMockUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists with this email'
      });
    }
    
    // Create new user in mock data with trimmed values
    const newUser = {
      _id: (mockUsers.length + 1).toString(),
      name: req.body.name.trim(),
      email: req.body.email.toLowerCase().trim(),
      mobile: req.body.mobile,
      password: req.body.password // In a real app, this would be hashed
    };
    
    mockUsers.push(newUser);
    
    // Generate token
    const token = generateToken(newUser);
    
    // Return user data and token
    return res.status(201).json({
      status: 'success',
      message: 'User created successfully (mock)',
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          mobile: newUser.mobile
        },
        token
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred during signup'
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    // Validate input
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    const email = req.body.email.toLowerCase().trim();
    
    // First try to find user in database
    try {
      // Check if user exists in database
      const user = await User.findOne({ email });
      
      if (user) {
        // Check if password is correct
        const match = await user.checkPassword(req.body.password);
        
        if (match) {
          // Generate token
          const token = generateToken(user);
          
          console.log(`User ${user.email} logged in successfully`);
          
          // Return user data and token
          return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile
              },
              token
            }
          });
        }
      }
    } catch (dbError) {
      console.error("Database error during login:", dbError.message);
      // Fall back to mock data if database fails
    }
    
    // Fallback to mock data
    // Check if user exists in mock data
    const mockUser = mockUsers.find(user => user.email === email);
    
    if (!mockUser) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }
    
    // Check if password is correct (simplified for mock data)
    const isPasswordCorrect = mockUser.password === req.body.password;
    
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }
    
    // Generate token
    const token = generateToken(mockUser);
    
    console.log(`Mock user ${mockUser.email} logged in successfully`);
    
    // Return user data and token
    return res.status(200).json({
      status: 'success',
      message: 'Login successful (mock)',
      data: {
        user: {
          id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          mobile: mockUser.mobile
        },
        token
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred during login'
    });
  }
});

// Add a debug route to check if a user exists
router.get('/check-user/:email', async (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();
    console.log(`Checking if user exists with email: ${email}`);
    
    // Try to find the user in the database
    try {
      const user = await User.findOne({ email });
      
      if (user) {
        console.log(`User found with email: ${email}`);
        return res.status(200).json({
          status: 'success',
          message: 'User exists',
          data: {
            id: user._id,
            email: user.email,
            name: user.name
          }
        });
      }
    } catch (dbError) {
      console.error("Database error during user check:", dbError.message);
    }
    
    // Try mock users as fallback
    const mockUser = mockUsers.find(user => user.email === email);
    
    if (mockUser) {
      console.log(`Mock user found with email: ${email}`);
      return res.status(200).json({
        status: 'success',
        message: 'User exists (mock)',
        data: {
          id: mockUser._id,
          email: mockUser.email,
          name: mockUser.name
        }
      });
    }
    
    // No user found in database or mock data
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
    
  } catch (error) {
    console.error("User check error:", error);
    return res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred while checking user'
    });
  }
});

module.exports = router; 