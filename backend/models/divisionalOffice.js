const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const divisionalOffice = new Schema({
    office: {
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
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
}, {
timestamps: true
});
const divisionalOffice_Schema = mongoose.model('divisionalOffice', divisionalOffice);
module.exports = divisionalOffice_Schema;