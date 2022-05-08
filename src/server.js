//third-party packages and libs 
const mongoose = require('mongoose');

//importing app and set it as server
const server = require('./app');

//database and server configs
const port = process.env.PORT;
const dataBaseUri = process.env.DB_URI;

//database connection and server listener 
mongoose.connect(dataBaseUri, { 
    useNewUrlParser: true
})
  .then((result) => server.listen(port, () => console.log(`server is up and running at port ${port}`)))
  .catch((err) => console.log(err));