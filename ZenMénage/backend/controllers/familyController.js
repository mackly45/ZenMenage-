const Family = require('../models/Family');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get family details
exports.getFamily = async (req, res) => {
  try {
    // If we have a real database connection, use populate
    let family;
    if (global.mongoose) {
      family = await Family.findById(req.user.family)
        .populate('members', 'name email avatar');
    } else {
      // Use mock database
      family = await Family.findById(req.user.family);
      
      // Mock populate functionality
      if (family && family.members) {
        const members = [];
        for (let memberId of family.members) {
          const user = await User.findById(memberId);
          if (user) {
            members.push({
              _id: user._id,
              name: user.name,
              email: user.email,
              avatar: user.avatar
            });
          }
        }
        family.members = members;
      }
    }
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Family not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        family
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update family details
exports.updateFamily = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const { name } = req.body;
    
    let family = await Family.findById(req.user.family);
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Family not found'
      });
    }
    
    // Check if user is the creator
    if (family.createdBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this family'
      });
    }
    
    family = await Family.findByIdAndUpdate(
      req.user.family,
      { name },
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: {
        family
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Invite member to family
exports.inviteMember = async (req, res) => {
  try {
    const family = await Family.findById(req.user.family);
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Family not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        inviteCode: family.inviteCode
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Join family with invite code
exports.joinFamily = async (req, res) => {
  try {
    const { inviteCode } = req.body;
    
    const family = await Family.findOne({ inviteCode });
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Invalid invite code'
      });
    }
    
    // Check if user is already in this family
    if (family.members.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'You are already a member of this family'
      });
    }
    
    // Add user to family
    family.members.push(req.user.id);
    await family.save();
    
    // Update user's family reference
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { family: family._id },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: {
        family,
        user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Remove member from family
exports.removeMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    
    const family = await Family.findById(req.user.family);
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Family not found'
      });
    }
    
    // Check if user is the creator
    if (family.createdBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to remove members'
      });
    }
    
    // Check if trying to remove self (creator)
    if (memberId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot remove family creator'
      });
    }
    
    // Remove member from family
    family.members = family.members.filter(
      member => member.toString() !== memberId
    );
    await family.save();
    
    // Remove family reference from user
    await User.findByIdAndUpdate(memberId, { family: null });
    
    res.status(200).json({
      success: true,
      data: {
        family
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};