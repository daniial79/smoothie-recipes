//User model
const User = require('../models/User');

//User model error handler
const handleUserErrors = require('../errors/model errors');

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
        res.status(201).json({
            user
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