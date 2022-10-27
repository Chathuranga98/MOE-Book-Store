const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookRejectSchema = new Schema({
    request_id: {
        type: String,
        required: true,
    },

    comment: {
        type: String,
        required: true,
    },
}, {
timestamps: true
});
const Book_reject_Schema = mongoose.model('Book_reject_reason', BookRejectSchema);
module.exports = Book_reject_Schema;