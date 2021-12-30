const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Create Category Schema
let Category = new Schema({
    categoryname: {
        type: String
    },
});

module.exports = mongoose.model('Category', Category);
