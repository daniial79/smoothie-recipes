//third party packages and libs 
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

//ading generateAuthToken to User Instance
userSchema.methods.generateAuthToken = async function(_id){
    try{
        const token = await jwt.sign({_id}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        return token
    }catch(error){
        throw new Error('something went wrong in generating jwt!');
    }
}

//adding findByCredentials method to User model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('unable to login');
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if(!passwordIsMatch){
        throw new Error('unable to login');
    }
    
    return user;
}

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