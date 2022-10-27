const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book_Shop = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telephoneNumber : {
        type: String,
        required: true,
        unique:true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    profile : {
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
const book_Shop_Schema = mongoose.model('book_Shop', book_Shop);
module.exports = book_Shop_Schema;