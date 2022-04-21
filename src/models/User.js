//third party packages and libs 
const mongoose = require('mongoose');
const validator = require('validator');

//user schema 
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        uniqure: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 7
    }
});

//modelizing user schema 
const User = mongoose.model('user', userSchema);

//exporting section
module.exports = User;