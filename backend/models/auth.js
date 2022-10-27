const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auth = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType:{
        type: String,
        required: true
    }
}, {
timestamps: true
});
const auth_Schema = mongoose.model('auth', auth);
module.exports = auth_Schema;