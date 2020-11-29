const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = 4000;

//import Routes
const authRoute = require('./routes/auth');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true },() => 
    console.log('Conneted to db!')
);

//MiddleWares

//Middleware for body parser
app.use(express.json());

//Route MiddleWare
app.use('/api/user', authRoute);

// Setup middleware to do logging
app.use((req, res, next) =>{
    console.log(req.method + " request for " + req.url );
    next(); 
})






app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});








//Setup serving front-end code
// app.use('/', express.static('static'))
// var cors = require('cors')
// app.use(cors())
// app.use('/api', router)
// const router = express.Router();