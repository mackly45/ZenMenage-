const bcrypt = require('bcryptjs');

let MongooseUser = null;

function getMongooseUser() {
  const mongoose = require('mongoose');
  if (MongooseUser) return MongooseUser;

  try {
    MongooseUser = mongoose.model('User');
    return MongooseUser;
  } catch (error) {
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
    userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 12);
      next();
    });

    // Compare password method
    userSchema.methods.comparePassword = async function (candidatePassword) {
      return await bcrypt.compare(candidatePassword, this.password);
    };

    // Remove password from output
    userSchema.methods.toJSON = function () {
      const userObject = this.toObject();
      delete userObject.password;
      return userObject;
    };

    MongooseUser = mongoose.model('User', userSchema);
    return MongooseUser;
  }
}

class User {
  static async create(userData) {
    if (global.mongoose) {
      return getMongooseUser().create(userData);
    } else {
      const db = global.db;
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = db.createUser({
        ...userData,
        password: hashedPassword
      });
      user.comparePassword = async function (candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
      };
      return user;
    }
  }

  static async findOne(query) {
    if (global.mongoose) {
      return getMongooseUser().findOne(query);
    } else {
      return global.db.findUser(query);
    }
  }

  static async findById(id) {
    if (global.mongoose) {
      return getMongooseUser().findById(id);
    } else {
      return global.db.findUserById(id);
    }
  }

  static async findByIdAndUpdate(id, updateData, options = {}) {
    if (global.mongoose) {
      return getMongooseUser().findByIdAndUpdate(id, updateData, options);
    } else {
      return global.db.updateUser(id, updateData);
    }
  }
}

module.exports = User;

module.exports = User;