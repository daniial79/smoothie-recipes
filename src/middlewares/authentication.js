//third-party packages and libs
const e = require('express');
const jwt = require('jsonwebtoken');

//User models
const User = require('../models/User');

//logic section 
const authenticate =  (req, res, next) => {
    const token = req.cookies.authToken;

    if(token){
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken){
            next();
        }else{
            res.redirect('/login');
        }
    }else{
        res.redirect('/login');
    }
}


//exporting section 
module.exports = authenticate;