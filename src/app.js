//core modules 
const path = require('path');

//third-party package and libs
const express = require('express');

//setting up the app
const app = express();

//app middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

//importing routers
const mainPageRouters = require('./routes/mainPages.routes');

//deploying routers
app.use(mainPageRouters);

//exporting section
module.exports = app;
