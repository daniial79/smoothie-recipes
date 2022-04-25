//third party packages and libs 
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

//user schema 
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email must be unique'],
        trim: true,
        validate: [validator.isEmail, 'email is invalid']
    },

    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [7, 'password must be at least 7 characters']
    }
});

//mongoose hooks 

//hashing the password before saving it ro database
userSchema.pre('save', async function(next){
    const user = this;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
})

//modelizing user schema 
const User = mongoose.model('user', userSchema);

//exporting section
module.exports = User;