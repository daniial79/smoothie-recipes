//third-party packages and libs
const jwt = require('jsonwebtoken');

//User model
const User = require('../models/User');

//helper and handler functions
const handleUserErrors = require('../errors/model errors');
const generateAuthToken = require('../helpers/authTokenGenerator');

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
        const token = await generateAuthToken(user);
        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3
        })
        res.status(201).json({
            user: user._id
        })
    }catch(error){
        const userFriendlyError = handleUserErrors(error);
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
}

//exporting section 
module.exports = {
    getSignUp,
    postSignUp,
    getLogIn,
    postLogIn
}