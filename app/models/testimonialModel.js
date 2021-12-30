const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Create Testimonial Schema
let Testimonial = new Schema({
    testi_name: {
        type: String
    },
    designation: {
        type: String
    },
    testi_desc: {
        type: String
    },
    img: {
        type: String
    },
});

module.exports = mongoose.model('Testimonial', Testimonial);
