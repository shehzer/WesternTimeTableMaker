const router = require('express').Router()
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation, updateValidation} = require('../validation');
const { valid } = require('@hapi/joi');



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
            password: hashPass,
            role: req.body.role,
            active: req.body.active
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
        if(!user) return res.status(400).send('Email ');

        //Password is correct
        const valid_pass = await bcrypt.compare(req.body.password, user.password);

        if(!valid_pass) return res.status(400).send('Invalid Password');

        //Create jwt token
        const token = jwt.sign({_id: user._id,
                                _username: user.name,
                                _role: user.role,
                                _active: user.active,
                                _email: user.email}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json(token);
    });




    //Login
    router.post('/update', async (req,res) => {
        //Validate Response
        const {error} = updateValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //Check if email exists
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email ');

        //Password is correct
        const valid_pass = await bcrypt.compare(req.body.password, user.password);

       

        if(!valid_pass) return res.status(400).json('Invalid Password');

        if(valid_pass){
            user.password = req.body.update;
            user.save();
            console.log(user.password);
            //HASH PASS AGAIN
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(user.password, salt);
            user.password = hashPass;
            console.log(user.password);
            user.save();
            res.status(200).json('password updated!');
        }

       
    });

   


module.exports = router;