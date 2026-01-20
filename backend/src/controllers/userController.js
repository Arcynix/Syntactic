const userService = require('../services/userService');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getProfile = catchAsync(async (req, res, next) => {
    // req.user.id comes from authMiddleware
    const profile = await userService.getProfile(req.user.id);

    // If no profile exists yet, return empty object or partial user info
    // Or we can return just the user data if profile is null
    res.status(200).json({
        status: 'success',
        data: {
            profile: profile || {}
        }
    });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
    // Filter body to only allow specific fields? 
    // For now, userService handles specific fields destructuring
    const updatedProfile = await userService.updateProfile(req.user.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            profile: updatedProfile
        }
    });
});
