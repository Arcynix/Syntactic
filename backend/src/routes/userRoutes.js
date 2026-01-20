const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes after this middleware
router.use(authMiddleware.protect);

router.get('/profile', userController.getProfile);
router.patch('/profile', userController.updateProfile);

module.exports = router;
