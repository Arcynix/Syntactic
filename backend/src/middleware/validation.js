const { body } = require('express-validator');

exports.validateRegistration = [
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('username')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[\W]/)
        .withMessage('Password must contain at least one special character'),
];

exports.validateLogin = [
    body('identifier').notEmpty().withMessage('Email or Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

exports.validateResetRequest = [
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
];

exports.validatePasswordReset = [
    body('token').notEmpty().withMessage('Token is required'),
    body('newPassword')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[\W]/)
        .withMessage('Password must contain at least one special character'),
];

// Middleware to check validation results
const { validationResult } = require('express-validator');
const AppError = require('../utils/appError');

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join('. ');
        return next(new AppError(errorMessages, 400));
    }
    next();
};
