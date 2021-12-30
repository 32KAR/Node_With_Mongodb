const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Create Contact Schema
let Contact = new Schema({
    contact_name: {
        type: String
    },
    contact_email: {
        type: String
    },
    contact_no: {
        type: String
    },
    msg: {
        type: String
    },
    date: {
        type: String
    },
});

module.exports = mongoose.model('Contact', Contact);
