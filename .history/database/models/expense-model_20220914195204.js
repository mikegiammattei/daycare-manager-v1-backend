const mongoose = require('mongoose');

const ExpenseItemSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        trim: true,
        required: "Expense name is required",
    },
    expenseAmount: {
        type: number,
        trim: true,
        required: "Expense amount is required",
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
});

const newLeadComment = mongoose.model('newLeadComment', CRMLeadCommentSchema);

module.exports = newLeadComment;

