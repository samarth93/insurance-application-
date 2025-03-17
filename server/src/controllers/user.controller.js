const express = require("express");
const User = require("../models/user.model");
const { authenticate } = require('../middleware/auth.middleware');
const router = express.Router();

// Public routes (no authentication required)

// Get user by ID (for policy creation)
router.get("/public/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .lean()
      .exec();
      
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// Create user (for policy creation without authentication)
router.post("/", async (req, res) => {
  try {
    const data = await User.create(req.body);
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// Protected routes (authentication required)

// Get current user profile
router.get("/profile", authenticate, async (req, res) => {
  try {
    // req.user is set by the authenticate middleware
    return res.status(200).json({
      status: 'success',
      data: req.user
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// Update current user profile
router.patch("/profile", async (req, res) => {
  try {
    // Don't allow password update through this route
    if (req.body.password) {
      delete req.body.password;
    }
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select('-password');
    
    return res.status(200).json({
      status: 'success',
      message: 'User profile updated successfully',
      data: user
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// Change password
router.post("/change-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Check if current password and new password are provided
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Current password and new password are required'
      });
    }
    
    // Get user
    const user = await User.findById(req.user.id);
    
    // Check if current password is correct
    const match = await user.checkPassword(currentPassword);
    
    if (!match) {
      return res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    return res.status(200).json({
      status: 'success',
      message: 'Password changed successfully'
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// Admin routes (for testing purposes)
router.get("/", async (req, res) => {
  try {
    const data = await User.find().select('-password');
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

module.exports = router;
