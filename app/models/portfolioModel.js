const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Create Testimonial Schema
let Portfolio = new Schema({
    proj_category: {
        type: String
    },
    proj_name: {
        type: String
    },
    proj_title: {
        type: String
    },
    proj_image: {
        type: Array
    },
    proj_date: {
        type: String
    },
    proj_desc: {
        type: String
    },

});

module.exports = mongoose.model('Portfolio', Portfolio);
