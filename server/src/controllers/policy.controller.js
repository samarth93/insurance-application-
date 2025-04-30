const express = require('express');
const Policy = require('../models/policy.model');
const User = require('../models/user.model');
const { authenticate } = require('../middleware/auth.middleware');
const router = express.Router();

// Add a debug route to check policies for a user by email (no authentication required)
router.get("/check-by-email/:email", async (req, res) => {
    try {
        const email = req.params.email;
        console.log(`Checking policies for user with email: ${email}`);
        
        // First, find the user
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }
        
        // Find all policies associated with this user
        const policies = await Policy.find({ userId: user._id });
        
        return res.status(200).json({
            status: "success",
            count: policies.length,
            data: policies
        });
    } catch (err) {
        console.error("Error checking policies by email:", err.message);
        return res.status(500).json({
            status: "error",
            message: err.message
        });
    }
});

// Apply authentication middleware to all other routes
router.use(authenticate);

// Get all policies for the authenticated user
router.get("/", async (req, res) => {
  try {
        const userId = req.user._id;
        const policies = await Policy.find({ userId });
    
    return res.status(200).json({
            status: "success",
            count: policies.length,
      data: policies
    });
    } catch (err) {
    return res.status(500).json({
            status: "error",
            message: err.message
    });
  }
});

// Get a specific policy
router.get('/:id', async (req, res) => {
  try {
    const policy = await Policy.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!policy) {
      return res.status(404).json({
        status: 'error',
        message: 'Policy not found'
      });
    }
    
    return res.status(200).json({
      status: 'success',
      message: 'Policy retrieved successfully',
      data: policy
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Create a new policy
router.post('/', async (req, res) => {
  try {
    // Add user ID to policy data
    const policyData = {
      ...req.body,
      userId: req.user.id
    };
    
    // Create policy
    const policy = await Policy.create(policyData);
    
    // Add policy to user's policies array
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { policies: policy._id } }
    );
    
    return res.status(201).json({
      status: 'success',
      message: 'Policy created successfully',
      data: policy
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Update a policy
router.patch('/:id', async (req, res) => {
  try {
    // Check if policy exists and belongs to user
    const existingPolicy = await Policy.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!existingPolicy) {
      return res.status(404).json({
        status: 'error',
        message: 'Policy not found'
      });
    }
    
    // Update policy
    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    return res.status(200).json({
      status: 'success',
      message: 'Policy updated successfully',
      data: policy
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Add a claim to a policy
router.post('/:id/claims', async (req, res) => {
  try {
    // Check if policy exists and belongs to user
    const existingPolicy = await Policy.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!existingPolicy) {
      return res.status(404).json({
        status: 'error',
        message: 'Policy not found'
      });
    }
    
    // Generate claim ID
    const claimId = `CLAIM-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Add claim to policy
    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      { 
        $push: { 
          claims: {
            ...req.body,
            claimId,
            claimDate: new Date(),
            claimStatus: 'pending'
          } 
        } 
      },
      { new: true }
    );
    
    return res.status(201).json({
      status: 'success',
      message: 'Claim added successfully',
      data: policy
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router; 