//third-party packages and libs
const router = require('express').Router(); 

//importing main pages controllers
const mainPagesControllers= require('../controllers/mainPages.controllers');

//importing authentication middleware
const {authenticate} = require('../middlewares/authentication');

//rendering home page
router.get('/', mainPagesControllers.renderHomePage);

//rendering smoothie-recipes page
router.get('/smoothies', authenticate , mainPagesControllers.renderSmoothiePage);

//exporting section 
module.exports = router;