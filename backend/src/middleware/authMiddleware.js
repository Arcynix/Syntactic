const { verifyToken } = require('../utils/tokens');
const userService = require('../services/userService');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Get token from header
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // 2) Verify token
    let decoded;
    try {
        decoded = verifyToken(token);
    } catch (err) {
        return next(new AppError('Invalid token. Please log in again.', 401));
    }

    // 3) Check if user still exists
    const currentUser = await userService.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError('The user belonging to this token does no longer exist.', 401)
        );
    }

    // 4) Check if user changed password after the token was issued (Optional enhancement, skipped for now as we don't track password_changed_at)

    // Grant access
    // Remove password hash
    delete currentUser.password_hash;
    req.user = currentUser;
    next();
});
