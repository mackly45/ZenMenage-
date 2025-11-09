const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

const loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
];

const updatePasswordValidation = [
  body('currentPassword', 'Current password is required').exists(),
  body('newPassword', 'Password must be 6 or more characters').isLength({ min: 6 })
];

// Public routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

// Protected routes
router.get('/me', auth, authController.getMe);
router.put('/update-details', auth, authController.updateDetails);
router.put('/update-password', auth, updatePasswordValidation, authController.updatePassword);

module.exports = router;