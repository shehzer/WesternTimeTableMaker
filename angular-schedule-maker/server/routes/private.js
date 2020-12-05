const router = require('express').Router();
const verify = require('./verifytoken');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
var escapeHTML = require('escape-html');
db.defaults({schedules:[]}).write();
const expressSanitizer = require('express-sanitizer');
var data = require('../data.json');



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
                                  courseName:[],
                                  flag: "private",
                                  creator: req.user._username}).write();
    res.status(200).send("The schedule " + name + " has been created");
}); 

//task 5 adds course to given schedule
router.put('/create/schedule/:name', (req, res) => {

    var name = req.sanitize(req.params.name);
    name = escapeHTML(name);
    const schedule = req.body;
    
    let sub = req.sanitize(schedule.subjectCode)
    let cour = req.sanitize(schedule.courseCode)
    let flag = req.sanitize(schedule.flag)
    let subject = JSON.parse(`"${sub}"`); 
    let course = JSON.parse(`"${cour}"`); 

    for (let i = 0; i < db.getState().schedules.length; i++) {
        if (db.getState().schedules[i].scheduleName === name ) {
            for (let k = 0; k < db.getState().schedules[i].courseName.length; k++) {
                if (db.getState().schedules[i].courseName[k].toUpperCase() === 
                    course.toUpperCase() && 
                    db.getState().schedules[i].subject[k].toUpperCase() === 
                    subject.toUpperCase()) {
                    db.getState().schedules[i].courseName = course;
                    db.getState().schedules[i].subject = subject;
                    db.getState().schedules[i].flag = flag;
                    db.update('schedules').write();
                    console.log("overwritten")
                    res.status(200).send("Overwrite");
                    return;
                }
            }
            
            console.log("hi" + db.getState().schedules[i].subject);
            db.getState().schedules[i].subject.push(subject);
            db.getState().schedules[i].courseName.push(course);
            db.getState().schedules[i].flag = flag;
            db.update('schedules').write();
            res.status(200).send("Added");
            return;
        }
    }

    res.status(404).send("Name does not exist");
});

//Task 8
router.get('/show/schedule', (req,res)=>{
    let scheduleList=[];
    for(let i = 0; i<db.getState().schedules.length; i++){
        console.log(db.getState().schedules[i].courseName.length)
        var size = `${db.getState().schedules[i].courseName.length}`
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
    let display = [];
    for(let i = 0; i<db.getState().schedules.length; i++){
        if(db.getState().schedules[i].scheduleName===name){
            for(let k=0; k<db.getState().schedules[i].courseName.length;k++){
                let showC = db.getState().schedules[i].courseName[k];
                console.log(showC)
                let showS = db.getState().schedules[i].subject[k];
                console.log(showS)
                const course = data.filter(a => a.subject.toString().toLowerCase()=== req.sanitize(showS.toString().toLowerCase()));
                console.log(course)
                const final = course.filter(a => a.catalog_nbr.toString().toUpperCase() === req.sanitize(showC.toString().toUpperCase()));
                console.log(final)
                display.push(final);

            }
            res.send(display);
            return;
           
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