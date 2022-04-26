//third-party packages and libs
const router = require('express').Router();

//importing auth controllers
const authControllers = require('../controllers/auth.controllers');

//routing section

//rendering signup form
router.get('/signup', authControllers.getSignUp);

//posting signup form data
router.post('/signup', authControllers.postSignUp);

//rendering login form
router.get('/login', authControllers.getLogIn);

//posting login form data
router.post('/login', authControllers.postLogIn);

//exporting section
module.exports = router;