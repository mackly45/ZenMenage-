const express = require('express');
const { body } = require('express-validator');
const familyController = require('../controllers/familyController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation rules
const updateFamilyValidation = [
  body('name', 'Family name is required').not().isEmpty()
];

// All routes are protected
router.use(auth);

// Family routes
router.get('/', familyController.getFamily);
router.put('/update', updateFamilyValidation, familyController.updateFamily);
router.get('/invite', familyController.inviteMember);
router.post('/join', familyController.joinFamily);
router.post('/remove-member', familyController.removeMember);

module.exports = router;