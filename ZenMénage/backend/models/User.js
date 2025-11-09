// User model for both MongoDB and mock database
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const userSchema = new mongoose.Schema({
        name: {
          type: String,
          required: [true, 'Name is required'],
          trim: true,
          maxlength: [50, 'Name cannot be more than 50 characters']
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          lowercase: true,
          match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email'
          ]
        },
        password: {
          type: String,
          required: [true, 'Password is required'],
          minlength: [6, 'Password must be at least 6 characters'],
          select: false
        },
        role: {
          type: String,
          enum: ['admin', 'member'],
          default: 'member'
        },
        family: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Family'
        },
        avatar: {
          type: String,
          default: ''
        },
        isActive: {
          type: Boolean,
          default: true
        }
      }, {
        timestamps: true
      });
      
      // Hash password before saving
      userSchema.pre('save', async function(next) {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 12);
        next();
      });
      
      // Compare password method
      userSchema.methods.comparePassword = async function(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
      };
      
      // Remove password from output
      userSchema.methods.toJSON = function() {
        const userObject = this.toObject();
        delete userObject.password;
        return userObject;
      };
      
      return mongoose.model('User', userSchema).create(userData);
    } else {
      // Use mock database
      const db = global.db;
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      // Create user
      const user = db.createUser({
        ...userData,
        password: hashedPassword
      });
      
      // Add comparePassword method
      user.comparePassword = async function(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
      };
      
      return user;
    }
  }
  
  static async findOne(query) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const User = mongoose.model('User');
      return User.findOne(query);
    } else {
      // Use mock database
      const db = global.db;
      return db.findUser(query);
    }
  }
  
  static async findById(id) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const User = mongoose.model('User');
      return User.findById(id);
    } else {
      // Use mock database
      const db = global.db;
      return db.findUserById(id);
    }
  }
  
  static async findByIdAndUpdate(id, updateData, options = {}) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const User = mongoose.model('User');
      return User.findByIdAndUpdate(id, updateData, options);
    } else {
      // Use mock database
      const db = global.db;
      return db.updateUser(id, updateData);
    }
  }
}

module.exports = User;