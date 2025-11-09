const express = require('express');
const statsController = require('../controllers/statsController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

// Stats routes
router.get('/dashboard', statsController.getDashboardStats);
router.get('/weekly', statsController.getWeeklyStats);

module.exports = router;