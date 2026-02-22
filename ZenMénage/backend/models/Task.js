let MongooseTask = null;

function getMongooseTask() {
  const mongoose = require('mongoose');
  if (MongooseTask) return MongooseTask;

  try {
    MongooseTask = mongoose.model('Task');
    return MongooseTask;
  } catch (error) {
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
    taskSchema.pre('save', function (next) {
      if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
        this.completedAt = new Date();
      }
      next();
    });

    MongooseTask = mongoose.model('Task', taskSchema);
    return MongooseTask;
  }
}

class Task {
  static async create(taskData) {
    if (global.mongoose) {
      return getMongooseTask().create(taskData);
    } else {
      const db = global.db;
      const taskWithCompletion = { ...taskData };
      if (taskWithCompletion.status === 'completed' && !taskWithCompletion.completedAt) {
        taskWithCompletion.completedAt = new Date();
      }
      return db.createTask(taskWithCompletion);
    }
  }

  static async find(query) {
    if (global.mongoose) {
      return getMongooseTask().find(query);
    } else {
      return global.db.findTasks(query);
    }
  }

  static async findById(id) {
    if (global.mongoose) {
      return getMongooseTask().findById(id);
    } else {
      return global.db.findTaskById(id);
    }
  }

  static async findByIdAndUpdate(id, updateData, options = {}) {
    if (global.mongoose) {
      return getMongooseTask().findByIdAndUpdate(id, updateData, options);
    } else {
      const updateWithCompletion = { ...updateData };
      if (updateWithCompletion.status === 'completed' && !updateWithCompletion.completedAt) {
        updateWithCompletion.completedAt = new Date();
      }
      return global.db.updateTask(id, updateWithCompletion);
    }
  }

  static async findByIdAndRemove(id) {
    if (global.mongoose) {
      return getMongooseTask().findByIdAndRemove(id);
    } else {
      return global.db.deleteTask(id);
    }
  }

  static async countDocuments(query) {
    if (global.mongoose) {
      return getMongooseTask().countDocuments(query);
    } else {
      const tasks = global.db.findTasks(query);
      return tasks.length;
    }
  }

  static async aggregate(pipeline) {
    if (global.mongoose) {
      return getMongooseTask().aggregate(pipeline);
    } else {
      // Mock aggregation for development
      console.log('Mock aggregation:', pipeline);
      const db = global.db;
      const tasks = db.findTasks({ family: pipeline[0].$match.family });
      const groupStep = pipeline.find(step => step.$group);
      if (groupStep) {
        const groupBy = groupStep.$group._id;
        const results = {};
        tasks.forEach(task => {
          const key = (typeof groupBy === 'string' && groupBy.startsWith('$'))
            ? task[groupBy.substring(1)]
            : 'total';
          if (!results[key]) {
            results[key] = { _id: key, count: 0, completed: 0 };
          }
          results[key].count++;
          if (task.status === 'completed') {
            results[key].completed++;
          }
        });
        return Object.values(results);
      }
      return [];
    }
  }
}

module.exports = Task;

module.exports = Task;