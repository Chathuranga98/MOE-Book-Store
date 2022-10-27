const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book_store = new Schema({
    shop: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    grade : {
        type: String,
        required: true,
    },
    medium : {
        type: String,
        required: true,
    },
    qty : {
        type: String,
        required: true
    },
    price : {
        type: String,
        required: true
    },
    discount : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    },
    current_qty : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true
    }
}, {
timestamps: true
});
const book_store_Schema = mongoose.model('book_store', book_store);
module.exports = book_store_Schema;