const router = require('express').Router();
const verify = require('./verifytoken');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
var escapeHTML = require('escape-html');
db.defaults({schedules:[]}).write();
const expressSanitizer = require('express-sanitizer');
const User = require('../model/User');


router.use(expressSanitizer());


//ability to create up to 20 named lists of courses that contain unique name, a description, a list of subject and catalog pairs
//task 4 creates schedule
router.put('/schedule/:name', verify, (req,res) =>{
    var name = req.sanitize(req.params.name);
    var user = User.findOne({email: req.body.email});
    name = escapeHTML(name);
    escape(name);
    //check if the name already exists, if so then return error
    for(var i=0; i<db.getState().schedules.length;i++){
        if(db.getState().schedules[i].scheduleName===name){
            res.status(404).send("Error");
            return;
        }
    }
    //if the name does not exist then create a new schedule and instatiate subject/coursename pair as json objects
    db.get('schedules').push({scheduleName:name,
                                  subject: [],
                                  courseName:[],
                                  flag: "private",
                                  creator: req.user._username}).write();
    res.status(200).send("The schedule " + name + " has been created");
}); 

//task 5 adds course to given schedule

router.put('/create/schedule/:name', verify, (req,res)=>{
    var name = req.sanitize(req.params.name);
    name = escapeHTML(name);
    const schedule = req.body;
    
    let sub = req.sanitize(schedule.subjectCode)
    let cour = req.sanitize(schedule.courseCode)
    let flag = req.sanitize(schedule.flag)
    
    for(let i =0; i<db.getState().schedules.length; i++){
        if(db.getState().schedules[i].scheduleName===name){
            db.getState().schedules[i].subject = sub;
            db.getState().schedules[i].courseName = cour;
            db.getState().schedules[i].flag = flag;
            // db.getState().schedules[i].creator = user;
            // db.getState().schedules[i].creator = req.user;
            db.update('schedules').write()
            res.status(200).send("Added")
            return;
        }
    }
    res.status(404).send('ERROR');
});

//Task 8
router.get('/show/schedule', (req,res)=>{
    let scheduleList=[];
    for(let i = 0; i<db.getState().schedules.length; i++){
        var size = `${db.getState().schedules[i].courseName.length-4}`
        if(size <0){
            size =0;
        }
        if(`${db.getState().schedules[i].courseName.length}` ==4){
            size =1;
        }
        scheduleList.push({"Schedule name": `${db.getState().schedules[i].scheduleName}`, "Number courses" : `${size}`})
        //scheduleList.push(`Schedule name:${db.getState().schedules[i].scheduleName}, Number of courses:${db.getState().schedules[i].courseName.length}`)
    }
    res.send(scheduleList);
});


router.route('/schedules/:name/')

    .get((req,res)=>{
    var name = req.sanitize(req.params.name);
    name = escapeHTML(name);
    let display = '';
    for(let i = 0; i<db.getState().schedules.length; i++){
        if(db.getState().schedules[i].scheduleName===name){
            first =db.getState().schedules[i].courseName
            second = db.getState().schedules[i].subject;
            creator = db.getState().schedules[i].creator;
            display = {
          
                    "subject": second,
                    "course" : first,
                    "creator" : creator
                
            };
            res.send(display)
        }
    }
    res.status(404).send("Error")

})
    .post((req,res)=>{
    var sch_name = req.sanitize(req.params.name);
    sch_name = escapeHTML(sch_name)
    for(let i = 0; i<db.getState().schedules.length; i++){
        if(db.getState().schedules[i].scheduleName===sch_name){
            db.get("schedules").remove({scheduleName: sch_name}).write();
            res.send("Schedule " + sch_name + " has been deleted")
        }
    }
    res.status(404).send("Name doesn't exist")
    
});


//Task 9
router.post('/deleteall/schedules',(req,res)=>{
    for(let i = 0;i<db.getState().schedules.length;i++){
        db.set('schedules',[]).write();
        res.send("done")
    }
});

module.exports = router;