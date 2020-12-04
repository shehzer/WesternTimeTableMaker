const router = require('express').Router();
const verify = require('./verifyAdmin');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
var escapeHTML = require('escape-html');
db.defaults({schedules:[]}).write();
const expressSanitizer = require('express-sanitizer');
var data = require('../data.json');
const User = require('../model/User');

router.use(expressSanitizer());


router.put('/change/:name', verify, async (req,res) =>{
    var name = req.sanitize(req.params.name);
    name = escapeHTML(name);
    escape(name);

    if(req.user._role == "ADMIN"){

        //Check if email exists
        const user = await User.findOne({name: req.params.name});
        if(!user) return res.status(400).send('Name does not exist');
        console.log(user.role);
        user.role = "MANAGER";
        console.log(user.role);
        //user = req.user._role = "MANAGER";
       res.status(200).send(user)
    }
  else{
      res.status(400).send("You must be an admin!");
  }
}); 





module.exports = router;