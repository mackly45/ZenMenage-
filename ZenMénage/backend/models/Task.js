// Task model for both MongoDB and mock database

class Task {
  static async create(taskData) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const taskSchema = new mongoose.Schema({
        title: {
          type: String,
          required: [true, 'Task title is required'],
          trim: true,
          maxlength: [200, 'Task title cannot be more than 200 characters']
        },
        description: {
          type: String,
          maxlength: [1000, 'Task description cannot be more than 1000 characters']
        },
        room: {
          type: String,
          required: [true, 'Room is required'],
          enum: ['Cuisine', 'Salon', 'Salle de bain', 'Chambre', 'Bureau', 'Garage', 'Autre']
        },
        assignedTo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        family: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Family',
          required: true
        },
        priority: {
          type: String,
          enum: ['low', 'medium', 'high'],
          default: 'medium'
        },
        status: {
          type: String,
          enum: ['todo', 'in-progress', 'completed'],
          default: 'todo'
        },
        dueDate: {
          type: Date
        },
        completedAt: {
          type: Date
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        }
      }, {
        timestamps: true
      });
      
      // Set completedAt when status changes to completed
      taskSchema.pre('save', function(next) {
        if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
          this.completedAt = new Date();
        }
        next();
      });
      
      return mongoose.model('Task', taskSchema).create(taskData);
    } else {
      // Use mock database
      const db = global.db;
      
      // Set completedAt when status changes to completed
      const taskWithCompletion = { ...taskData };
      if (taskWithCompletion.status === 'completed' && !taskWithCompletion.completedAt) {
        taskWithCompletion.completedAt = new Date();
      }
      
      return db.createTask(taskWithCompletion);
    }
  }
  
  static async find(query) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const Task = mongoose.model('Task');
      return Task.find(query);
    } else {
      // Use mock database
      const db = global.db;
      return db.findTasks(query);
    }
  }
  
  static async findById(id) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const Task = mongoose.model('Task');
      return Task.findById(id);
    } else {
      // Use mock database
      const db = global.db;
      return db.findTaskById(id);
    }
  }
  
  static async findByIdAndUpdate(id, updateData, options = {}) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const Task = mongoose.model('Task');
      return Task.findByIdAndUpdate(id, updateData, options);
    } else {
      // Use mock database
      const db = global.db;
      
      // Set completedAt when status changes to completed
      const updateWithCompletion = { ...updateData };
      if (updateWithCompletion.status === 'completed' && !updateWithCompletion.completedAt) {
        updateWithCompletion.completedAt = new Date();
      }
      
      return db.updateTask(id, updateWithCompletion);
    }
  }
  
  static async findByIdAndRemove(id) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const Task = mongoose.model('Task');
      return Task.findByIdAndRemove(id);
    } else {
      // Use mock database
      const db = global.db;
      return db.deleteTask(id);
    }
  }
  
  static async countDocuments(query) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const Task = mongoose.model('Task');
      return Task.countDocuments(query);
    } else {
      // Use mock database
      const db = global.db;
      const tasks = db.findTasks(query);
      return tasks.length;
    }
  }
  
  static async aggregate(pipeline) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const Task = mongoose.model('Task');
      return Task.aggregate(pipeline);
    } else {
      // Mock aggregation for development
      console.log('Mock aggregation:', pipeline);
      return [];
    }
  }
}

module.exports = Task;