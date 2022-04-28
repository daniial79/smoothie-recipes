//third-party packages and libs
const bcrypt = require('bcrypt');

//User model
const User = require('../models/User');

//helper and handler functions
const generalAuthErrorHandler = require('../errors/authErrorHandler');

//logic section

//rendering signup form
const getSignUp = (req, res) => {
    res.render('signup');
}

//posting signup form data
const postSignUp = async  (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.generateAuthToken(user._id);
        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3
        })
        res.status(201).json({
            user: user._id
        })
    }catch(error){
        const userFriendlyError = generalAuthErrorHandler(error);
        res.status(400).json({
            errors: userFriendlyError
        })
    }
}

//rendering login form
const getLogIn = (req, res) => {
    res.render('login');
}

//posting login form data

const postLogIn = async (req, res) => {
    const user = {email: req.body.email, password: req.body.password};

    try{
        const foundUser = await User.findByCredentials(user.email, user.password);
        const token = await foundUser.generateAuthToken(foundUser._id);

        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3
        })

        res.status(200).json({
            user: foundUser._id
        })
    }catch(error){
        const userFriendlyError = generalAuthErrorHandler(error);
        res.status(400).json({
            errors: userFriendlyError
        })
    }   

}

//exporting section 
module.exports = {
    getSignUp,
    postSignUp,
    getLogIn,
    postLogIn
}