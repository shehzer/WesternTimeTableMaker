const router = require('express').Router()
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');



    router.post('/register', async (req,res)=> {
        //Validate Response
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //Check if user is already registered
        const emailExists = await User.findOne({email: req.body.email});
        if(emailExists) return res.status(400).send('Email Already exists');


        //HASH PASS
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);

        //Create New User
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPass
        });
        try{
            const savedUser = await user.save();
            res.send({user: user._id});
        } catch(err){
            res.status(400).send(err);
        }
    });

    //Login
    router.post('/login', async (req,res) => {
        //Validate Response
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //Check if email exists
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email or password is incorrect');

        //Password is correct
        const valid_pass = await bcrypt.compare(req.body.password, user.password);

        if(!valid_pass) return res.status(400).send('Invalid Password');

        //Create jwt token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    });


module.exports = router;