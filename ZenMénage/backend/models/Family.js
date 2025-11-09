// Family model for both MongoDB and mock database

class Family {
  static async create(familyData) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const familySchema = new mongoose.Schema({
        name: {
          type: String,
          required: [true, 'Family name is required'],
          trim: true,
          maxlength: [100, 'Family name cannot be more than 100 characters']
        },
        members: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }],
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        inviteCode: {
          type: String,
          unique: true
        }
      }, {
        timestamps: true
      });
      
      // Generate invite code before saving
      familySchema.pre('save', function(next) {
        if (!this.inviteCode) {
          this.inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        }
        next();
      });
      
      return mongoose.model('Family', familySchema).create(familyData);
    } else {
      // Use mock database
      const db = global.db;
      
      // Generate invite code
      const familyWithInvite = {
        ...familyData,
        inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase()
      };
      
      return db.createFamily(familyWithInvite);
    }
  }
  
  static async findOne(query) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const Family = mongoose.model('Family');
      return Family.findOne(query);
    } else {
      // Use mock database
      const db = global.db;
      return db.findFamily(query);
    }
  }
  
  static async findById(id) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const Family = mongoose.model('Family');
      return Family.findById(id);
    } else {
      // Use mock database
      const db = global.db;
      return db.findFamilyById(id);
    }
  }
  
  static async findByIdAndUpdate(id, updateData, options = {}) {
    // If we have a real database connection, use Mongoose
    if (global.mongoose) {
      const mongoose = require('mongoose');
      const Family = mongoose.model('Family');
      return Family.findByIdAndUpdate(id, updateData, options);
    } else {
      // Use mock database
      const db = global.db;
      return db.updateFamily(id, updateData);
    }
  }
}

module.exports = Family;