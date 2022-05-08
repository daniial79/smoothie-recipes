//third-party packages and libs
const jwt = require('jsonwebtoken');

//User models
const User = require('../models/User');

//logic section 
const authenticate = async (req, res, next) => {
    const token = req.cookies.authToken;

    if(token){
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken){
            req.user = await User.findById(decodedToken._id);
            next();
        }else{
            req.user = null;
            res.redirect('/login');
        }
    }else{
        req.user = null;
        res.redirect('/login');
    }
}

//checking current user
const checkUser = async (req, res, next) => {
    const token = req.cookies.authToken;

    if(token){
        const decodecToken = jwt.verify(token, process.env.JWT_SECRET);

        if(decodecToken){
            let user = await User.findById(decodecToken._id);
            res.locals.user = user;
            next();
        }else{
            res.locals.user = null;
            next();
        }
    }else{
        res.locals.user = null;
        next();
    }
}



//exporting section 
module.exports = {authenticate, checkUser};