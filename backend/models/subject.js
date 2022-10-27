const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subject = new Schema({
    subject_name: {
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    },
    qty:{
        type: String,
        required: true
    },
    medium:{
        type: String,
        required: true
    }
}, {
timestamps: true
});
const subject_Schema = mongoose.model('subject', subject);
module.exports = subject_Schema;