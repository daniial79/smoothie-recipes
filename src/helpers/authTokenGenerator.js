//third-party packages and libs
const jwt = require('jsonwebtoken');

//generating authToken from user _id
const generateAuthToken =  (user) => {
    try{
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '3d'
        });
        return token
    }catch(error){
        console.log(error);
    }
}


//exporting section
module.exports = generateAuthToken;