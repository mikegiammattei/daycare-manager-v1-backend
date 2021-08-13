const mongoose = require('mongoose');

const CRMLeadSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        trim: true,
        unique: true,
        required: "Phone address is required",
    },
    callerType: {
        type: String,
        required: "Caller Type is required"
    },
    email: {
        type: String,
        lowercase: true,
        unique: false
    }, 
    status: {
        type: Number,
        default: 1
    },
    goal: {
        type: String
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
});

const newLead = mongoose.model('newLead', CRMLeadSchema);

module.exports = newLead;

