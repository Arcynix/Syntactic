const rateLimit = require('express-rate-limit');

exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 login requests per windowMs
    message: {
        status: 'fail',
        message: 'Too many login attempts from this IP, please try again after 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

exports.apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        status: 'fail',
        message: 'Too many requests from this IP, please try again in an hour!'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
