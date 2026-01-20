const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const rateLimit = require('../middleware/rateLimit');
const validation = require('../middleware/validation');

const router = express.Router();

router.post(
    '/register',
    rateLimit.apiLimiter,
    validation.validateRegistration,
    validation.checkValidation,
    authController.register
);

router.post('/verify-otp', authController.verifyOtp);
router.post('/resend-otp', authController.resendOtp);

router.post(
    '/login',
    rateLimit.loginLimiter,
    validation.validateLogin,
    validation.checkValidation,
    authController.login
);

router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);

router.post(
    '/request-reset',
    rateLimit.apiLimiter,
    validation.validateResetRequest,
    validation.checkValidation,
    authController.requestReset
);

router.post(
    '/reset-password',
    rateLimit.apiLimiter,
    validation.validatePasswordReset,
    validation.checkValidation,
    authController.resetPassword
);

router.get('/me', authMiddleware.protect, authController.getMe);

module.exports = router;
