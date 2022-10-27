const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookRequestRegSchema = new Schema({
    bookshop: {
        type: String,
        required: true,
    },

    language: {
        type: String,
        required: true,
    },

    subject: {
        type: String,
        required: true,
    },

    grade:{
        type: String,
        required: true
    },
    qty:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    }
}, {
timestamps: true
});
const book_request_from_shop_Schema = mongoose.model('book_request_from_shop', BookRequestRegSchema);
module.exports = book_request_from_shop_Schema;