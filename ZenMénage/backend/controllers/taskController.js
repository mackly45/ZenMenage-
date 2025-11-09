const Task = require('../models/Task');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all tasks for a family
exports.getTasks = async (req, res) => {
  try {
    const { status, room } = req.query;
    
    // Build filter
    let filter = { family: req.user.family };
    
    if (status) {
      filter.status = status;
    }
    
    if (room) {
      filter.room = room;
    }
    
    // If we have a real database connection, use populate
    if (global.mongoose) {
      const tasks = await Task.find(filter)
        .populate('assignedTo', 'name')
        .populate('createdBy', 'name')
        .sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: tasks.length,
        data: {
          tasks
        }
      });
    } else {
      // Use mock database
      const tasks = await Task.find(filter);
      
      // Mock populate functionality
      for (let task of tasks) {
        if (task.assignedTo) {
          const user = await User.findById(task.assignedTo);
          task.assignedTo = { _id: user._id, name: user.name };
        }
        if (task.createdBy) {
          const user = await User.findById(task.createdBy);
          task.createdBy = { _id: user._id, name: user.name };
        }
      }
      
      res.status(200).json({
        success: true,
        count: tasks.length,
        data: {
          tasks
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    // If we have a real database connection, use populate
    let task;
    if (global.mongoose) {
      task = await Task.findById(req.params.id)
        .populate('assignedTo', 'name')
        .populate('createdBy', 'name');
    } else {
      // Use mock database
      task = await Task.findById(req.params.id);
      
      // Mock populate functionality
      if (task && task.assignedTo) {
        const user = await User.findById(task.assignedTo);
        task.assignedTo = { _id: user._id, name: user.name };
      }
      if (task && task.createdBy) {
        const user = await User.findById(task.createdBy);
        task.createdBy = { _id: user._id, name: user.name };
      }
    }
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if task belongs to user's family
    if (task.family.toString() !== req.user.family.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        task
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

// Create new task
exports.createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const { title, description, room, assignedTo, priority, dueDate } = req.body;
    
    // Create task
    const taskData = {
      title,
      description,
      room,
      assignedTo: assignedTo || req.user.id,
      family: req.user.family,
      priority,
      dueDate,
      createdBy: req.user.id
    };
    
    const task = await Task.create(taskData);
    
    // If we have a real database connection, use populate
    if (global.mongoose) {
      // Populate references
      await task.populate('assignedTo', 'name');
      await task.populate('createdBy', 'name');
    } else {
      // Mock populate functionality
      if (task.assignedTo) {
        const user = await User.findById(task.assignedTo);
        task.assignedTo = { _id: user._id, name: user.name };
      }
      if (task.createdBy) {
        const user = await User.findById(task.createdBy);
        task.createdBy = { _id: user._id, name: user.name };
      }
    }
    
    res.status(201).json({
      success: true,
      data: {
        task
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

// Update task
exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if task belongs to user's family
    if (task.family.toString() !== req.user.family.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }
    
    const { title, description, room, assignedTo, priority, status, dueDate } = req.body;
    
    // Update task
    const updateData = {
      title,
      description,
      room,
      assignedTo,
      priority,
      status,
      dueDate
    };
    
    task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );
    
    // If we have a real database connection, use populate
    if (global.mongoose) {
      // Populate references
      await task.populate('assignedTo', 'name');
      await task.populate('createdBy', 'name');
    } else {
      // Mock populate functionality
      if (task.assignedTo) {
        const user = await User.findById(task.assignedTo);
        task.assignedTo = { _id: user._id, name: user.name };
      }
      if (task.createdBy) {
        const user = await User.findById(task.createdBy);
        task.createdBy = { _id: user._id, name: user.name };
      }
    }
    
    res.status(200).json({
      success: true,
      data: {
        task
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

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if task belongs to user's family
    if (task.family.toString() !== req.user.family.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }
    
    // If we have a real database connection, use remove
    if (global.mongoose) {
      await task.remove();
    } else {
      // Use mock database
      await Task.findByIdAndRemove(req.params.id);
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Toggle task completion
exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if task belongs to user's family
    if (task.family.toString() !== req.user.family.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }
    
    // Toggle status
    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    const updateData = {
      status: newStatus,
      completedAt: newStatus === 'completed' ? Date.now() : null
    };
    
    // Update task
    task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );
    
    // If we have a real database connection, use populate
    if (global.mongoose) {
      // Populate references
      await task.populate('assignedTo', 'name');
      await task.populate('createdBy', 'name');
    } else {
      // Mock populate functionality
      if (task.assignedTo) {
        const user = await User.findById(task.assignedTo);
        task.assignedTo = { _id: user._id, name: user.name };
      }
      if (task.createdBy) {
        const user = await User.findById(task.createdBy);
        task.createdBy = { _id: user._id, name: user.name };
      }
    }
    
    res.status(200).json({
      success: true,
      data: {
        task
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