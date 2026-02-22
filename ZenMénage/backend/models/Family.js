let MongooseFamily = null;

function getMongooseFamily() {
  const mongoose = require('mongoose');
  if (MongooseFamily) return MongooseFamily;

  try {
    MongooseFamily = mongoose.model('Family');
    return MongooseFamily;
  } catch (error) {
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
    familySchema.pre('save', function (next) {
      if (!this.inviteCode) {
        this.inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      }
      next();
    });

    MongooseFamily = mongoose.model('Family', familySchema);
    return MongooseFamily;
  }
}

class Family {
  static async create(familyData) {
    if (global.mongoose) {
      return getMongooseFamily().create(familyData);
    } else {
      const db = global.db;
      const familyWithInvite = {
        ...familyData,
        inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase()
      };
      return db.createFamily(familyWithInvite);
    }
  }

  static async findOne(query) {
    if (global.mongoose) {
      return getMongooseFamily().findOne(query);
    } else {
      return global.db.findFamily(query);
    }
  }

  static async findById(id) {
    if (global.mongoose) {
      return getMongooseFamily().findById(id);
    } else {
      return global.db.findFamilyById(id);
    }
  }

  static async findByIdAndUpdate(id, updateData, options = {}) {
    if (global.mongoose) {
      return getMongooseFamily().findByIdAndUpdate(id, updateData, options);
    } else {
      return global.db.updateFamily(id, updateData);
    }
  }
}

module.exports = Family;

module.exports = Family;