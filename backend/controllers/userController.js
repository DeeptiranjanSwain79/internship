const catchAsyncError = require('../catchAsyncError');
const User = require("../models/userModel");

//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    try {
        const { name, email, phone, totalSales } = req.body;

        const user = await User.create({
            name, email, phone, totalSales
        });

        res.status(201).json({
            success: true,
            user
        });  //201 => Created
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

//Getting all users
exports.getUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
});

//Get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404).json({
            success: false,
            message: `No User found with id: ${req.params.id}`
        })
    }

    res.status(200).json({
        success: true,
        user,
    })
});

//Update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        totalSales: req.body.totalSales,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
    })
});

//Delete User
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        res.send(404).json({
            success: false,
            message: `No User found with id: ${req.params.id}`
        })
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
});

