// Mock database implementation for development/testing purposes
class MockDB {
  constructor() {
    this.data = {
      users: [],
      families: [],
      tasks: []
    };
    this.idCounter = 1;
  }

  // Generate unique ID
  generateId() {
    return `id_${this.idCounter++}`;
  }

  // Users
  createUser(userData) {
    const user = {
      _id: this.generateId(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.data.users.push(user);
    return user;
  }

  findUser(query) {
    return this.data.users.find(user => {
      return Object.keys(query).every(key => user[key] === query[key]);
    });
  }

  findUserById(id) {
    return this.data.users.find(user => user._id === id);
  }

  updateUser(id, updateData) {
    const userIndex = this.data.users.findIndex(user => user._id === id);
    if (userIndex !== -1) {
      this.data.users[userIndex] = {
        ...this.data.users[userIndex],
        ...updateData,
        updatedAt: new Date()
      };
      return this.data.users[userIndex];
    }
    return null;
  }

  // Families
  createFamily(familyData) {
    const family = {
      _id: this.generateId(),
      ...familyData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.data.families.push(family);
    return family;
  }

  findFamily(query) {
    return this.data.families.find(family => {
      return Object.keys(query).every(key => family[key] === query[key]);
    });
  }

  findFamilyById(id) {
    return this.data.families.find(family => family._id === id);
  }

  updateFamily(id, updateData) {
    const familyIndex = this.data.families.findIndex(family => family._id === id);
    if (familyIndex !== -1) {
      this.data.families[familyIndex] = {
        ...this.data.families[familyIndex],
        ...updateData,
        updatedAt: new Date()
      };
      return this.data.families[familyIndex];
    }
    return null;
  }

  // Tasks
  createTask(taskData) {
    const task = {
      _id: this.generateId(),
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.data.tasks.push(task);
    return task;
  }

  findTasks(query) {
    return this.data.tasks.filter(task => {
      return Object.keys(query).every(key => {
        if (key === 'status') {
          return task.status === query.status;
        }
        if (key === 'family') {
          return task.family === query.family;
        }
        return task[key] === query[key];
      });
    });
  }

  findTaskById(id) {
    return this.data.tasks.find(task => task._id === id);
  }

  updateTask(id, updateData) {
    const taskIndex = this.data.tasks.findIndex(task => task._id === id);
    if (taskIndex !== -1) {
      this.data.tasks[taskIndex] = {
        ...this.data.tasks[taskIndex],
        ...updateData,
        updatedAt: new Date()
      };
      return this.data.tasks[taskIndex];
    }
    return null;
  }

  deleteTask(id) {
    const taskIndex = this.data.tasks.findIndex(task => task._id === id);
    if (taskIndex !== -1) {
      const deletedTask = this.data.tasks.splice(taskIndex, 1)[0];
      return deletedTask;
    }
    return null;
  }
}

// Export singleton instance
module.exports = new MockDB();