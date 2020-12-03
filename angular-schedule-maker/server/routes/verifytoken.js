const jwt = require('jsonwebtoken');


//Middleware function for private routes
module.exports = function (req,res,next){
    //check if it has token
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    //If token exists, we want to verify it
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}