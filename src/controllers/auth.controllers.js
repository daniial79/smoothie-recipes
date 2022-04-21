//logic section

//rendering signup form
const getSignUp = (req, res) => {
    res.render('signup');
}

//posting signup form data
const postSignUp = (req, res) => {
    res.json({message: 'post sign up is wired up'});
}

//rendering login form
const getLogIn = (req, res) => {
    res.render('login');
}

//posting login form data

const postLogIn = (req, res) => {
    res.json({message: 'post log in is wired up'});
}

//exporting section 
module.exports = {
    getSignUp,
    postSignUp,
    getLogIn,
    postLogIn
}