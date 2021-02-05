const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: "First name is required",
    },
    lastName: {
        type: String,
        trim: true,
        required: "Last name is required",
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: "Email address is required",
    },
    password: {
        type: String,
        required: "Password is required",
        minLength: 6
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
});

const AdminUserModel = mongoose.model('adminUsers', adminUserSchema);

module.exports = AdminUserModel;

