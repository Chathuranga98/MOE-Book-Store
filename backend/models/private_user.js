const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const private_using = new Schema({
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
        required: true
    },
    nic : {
        type: String,
        required: true,
        unique : true
    },
    email : {
        type: String,
        required: true
    },
    password : {
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
const private_using_Schema = mongoose.model('private_using', private_using);
module.exports = private_using_Schema;