const router = require('express').Router();
const verify = require('./verifytoken');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
var escapeHTML = require('escape-html');
db.defaults({schedules:[]}).write();
const expressSanitizer = require('express-sanitizer');


router.use(expressSanitizer());


//ability to create up to 20 named lists of courses that contain unique name, a description, a list of subject and catalog pairs
//task 4 creates schedule
router.put('/schedule/:name', verify, (req,res) =>{
    var name = req.sanitize(req.params.name);
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
                                  courseName:[] }).write();
    res.status(200).send("The schedule " + name + " has been created");
}); 

//task 5 adds course to given schedule

router.put('/create/schedule/:name', verify, (req,res)=>{
    var name = req.sanitize(req.params.name);
    name = escapeHTML(name);
    const schedule = req.body;
    
    let sub = req.sanitize(schedule.subjectCode)
    let cour = req.sanitize(schedule.courseCode)
    for(let i =0; i<db.getState().schedules.length; i++){
        if(db.getState().schedules[i].scheduleName===name){
            db.getState().schedules[i].subject = sub;
            db.getState().schedules[i].courseName = cour;
            db.update('schedules').write()
            res.status(200).send("Added")
            return;
        }
    }
    res.status(404).send('ERROR');
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
            display = {
          
                    "subject": second,
                    "course" : first
                
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


module.exports = router;