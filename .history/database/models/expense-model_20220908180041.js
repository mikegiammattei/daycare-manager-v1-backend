const mongoose = require('mongoose');

const CRMLeadCommentSchema = new mongoose.Schema({
    leadID: {
        type: String,
        trim: true,
        required: "Lead ID is required",
    },
    comment: {
        type: String,
        trim: true,
        required: "Comment is required",
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
});

const newLeadComment = mongoose.model('newLeadComment', CRMLeadCommentSchema);

module.exports = newLeadComment;

