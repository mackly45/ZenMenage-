const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const Family = require('../models/Family');
const Task = require('../models/Task');
const mongoose = require('mongoose');

describe('Tasks API', () => {
  let token;
  let userId;
  let familyId;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect('mongodb://localhost:27017/zenmenage_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    // Create a family
    const family = await Family.create({
      name: 'Test Family',
      createdBy: user._id,
      members: [user._id],
    });

    // Update user with family reference
    user.family = family._id;
    await user.save();

    userId = user._id;
    familyId = family._id;

    // Login user to get token
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    token = res.body.token;
  });

  afterAll(async () => {
    // Clear database and close connection
    await User.deleteMany();
    await Family.deleteMany();
    await Task.deleteMany();
    await mongoose.connection.close();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        room: 'Salon',
        assignedTo: userId,
        priority: 'medium',
      };

      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(taskData);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.task.title).toBe(taskData.title);
      expect(res.body.data.task.room).toBe(taskData.room);
    });
  });

  describe('GET /api/tasks', () => {
    it('should get all tasks', async () => {
      // Create a task first
      await Task.create({
        title: 'Test Task',
        room: 'Salon',
        assignedTo: userId,
        family: familyId,
        priority: 'medium',
        createdBy: userId,
      });

      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.tasks.length).toBe(1);
    });
  });

  describe('PUT /api/tasks/:id/toggle', () => {
    it('should toggle task completion status', async () => {
      // Create a task first
      const task = await Task.create({
        title: 'Test Task',
        room: 'Salon',
        assignedTo: userId,
        family: familyId,
        priority: 'medium',
        createdBy: userId,
      });

      const res = await request(app)
        .put(`/api/tasks/${task._id}/toggle`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.task.status).toBe('completed');
    });
  });
});