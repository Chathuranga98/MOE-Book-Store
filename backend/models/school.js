const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const school = new Schema({
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
    faxNumber : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    website : {
        type: String,
        required: true
    },
    schoolType : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    logo : {
        type: String,
        required: true
    }
    ,
    DEO : {
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
const school_Schema = mongoose.model('schoolType', school);
module.exports = school_Schema;