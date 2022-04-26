//core modules 
const path = require('path');

//third-party package and libs
const express = require('express');
const cookieParser = require('cookie-parser');

//setting up the app
const app = express();

//app middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

//importing routers
const mainPageRouters = require('./routes/mainPages.routes');
const authRouters = require('./routes/auth.routes');

//deploying routers
app.use(mainPageRouters);
app.use(authRouters);

//exporting section
module.exports = app;
