const winston = require('winston');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-with-mongodb')
    .then(() => winston.info('Connected to MongoDB...'))
    .catch(err => winston.error('Could not connect to MongoDB...'));

const Schema = mongoose.Schema;

// Create Auth Schema
var Auth = new Schema({
    fname: { type: String },
    lname: { type: String },
    email: {
        type: String, unique: true
    },
    password: { type: String },
    phone: { type: String },
    img: { type: String },
    country: { type: String },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    hobbies: { type: Array },
    token: { type: String },
    otp: { type: String }
});




var AuthModel = mongoose.model('Auth', Auth);

module.exports = {
    AuthModel
}