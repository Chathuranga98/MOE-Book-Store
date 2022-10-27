const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book_buy = new Schema({
    bookId: {
        type: String,
        required: true
    },
    Qty: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    shop:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
}, {
timestamps: true
});
const book_buy_Schema = mongoose.model('book_buy', book_buy);
module.exports = book_buy_Schema