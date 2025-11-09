const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation rules
const createTaskValidation = [
  body('title', 'Task title is required').not().isEmpty(),
  body('room', 'Room is required').not().isEmpty(),
  body('priority', 'Priority must be low, medium, or high').isIn(['low', 'medium', 'high'])
];

// All routes are protected
router.use(auth);

// Task routes
router.route('/')
  .get(taskController.getTasks)
  .post(createTaskValidation, taskController.createTask);

router.route('/:id')
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

router.put('/:id/toggle', taskController.toggleTask);

module.exports = router;