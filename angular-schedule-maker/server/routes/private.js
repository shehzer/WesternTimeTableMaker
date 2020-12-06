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
                                  creator: req.user._username,
                                  review: String}).write();
    res.status(200).json("The schedule " + name + " has been created");
}); 

//task 5 adds course to given schedule
router.put('/create/schedule/:name',verify, (req, res) => {

    var name = req.sanitize(req.params.name);
    name = escapeHTML(name);
    const schedule = req.body;
    
    let sub = req.sanitize(schedule.subjectCode)
    var exists = data.find(d => d.subject === sub.toUpperCase());
    let cour = req.sanitize(schedule.courseCode)
    let flag = req.sanitize(schedule.flag)
    let subject = JSON.parse(`"${sub}"`); 
    let course = JSON.parse(`"${cour}"`); 
    if(exists){
    for (let i = 0; i < db.getState().schedules.length; i++) {
        if (db.getState().schedules[i].scheduleName === name ) {
            for (let k = 0; k < db.getState().schedules[i].courseName.length; k++) {
                if (db.getState().schedules[i].courseName[k].toUpperCase() === 
                    course.toUpperCase() && 
                    db.getState().schedules[i].subject[k].toUpperCase() === 
                    subject.toUpperCase()) {
                    db.getState().schedules[i].courseName = course;
                    db.getState().schedules[i].subject = subject;
                        while(flag != null){
                            db.getState().schedules[i].flag = flag;
                        }  
                    db.update('schedules').write();
                    console.log("overwritten")
                    res.status(200).json("Overwrite");
                    return;
                }
            }
            
            console.log("hi" + db.getState().schedules[i].subject);
            db.getState().schedules[i].subject.push(subject);
            db.getState().schedules[i].courseName.push(course);
            while(flag != null){
                db.getState().schedules[i].flag = flag;
            }  
            db.update('schedules').write();
            res.status(200).json("Added");
            return;
        }
    }
}
    res.status(404).send("Name does not exist");
});


router.put('/flag/schedule/:name', verify,(req, res) => {

    var name = req.sanitize(req.params.name);
    name = escapeHTML(name);
    const schedule = req.body;
    let flag = req.sanitize(schedule.flag)
    console.log(flag)
    console.log(schedule)
    console.log(db.getState().schedules.length)
    for (let i = 0; i < db.getState().schedules.length; i++) {
        if (db.getState().schedules[i].scheduleName === name ) {
                console.log(db.getState().schedules[i])
                db.getState().schedules[i].flag=flag
            db.update('schedules').write();
            res.status(200).json("Added");
            break;
        }
    }

    res.status(404).send("Name does not exist");
});

router.put('/review/schedule/:name', verify,(req, res) => {

    var name = req.sanitize(req.params.name);
    name = escapeHTML(name);
    const schedule = req.body;
    let review = req.sanitize(schedule.review)
    console.log(schedule)
    console.log(db.getState().schedules.length)
    for (let i = 0; i < db.getState().schedules.length; i++) {
        if (db.getState().schedules[i].scheduleName === name ) {
                console.log(db.getState().schedules[i])
                db.getState().schedules[i].review=review
            db.update('schedules').write();
            res.status(200).json("Added");
            break;
        }
    }

    res.status(404).send("Name does not exist");
});



//Task 8
router.get('/show/schedule', verify,(req,res)=>{
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

    .get(verify,(req,res)=>{
    var name = req.sanitize(req.params.name);
    name = escapeHTML(name);
    let display = [];
    
    for(let i = 0; i<db.getState().schedules.length; i++){
        var size = `${db.getState().schedules[i].courseName.length}`     
        if(db.getState().schedules[i].scheduleName===name){
            display.push({"scheduleName": `${db.getState().schedules[i].scheduleName}`, "Numcourses" : `${size}`, "Creator" : `${db.getState().schedules[i].creator}`,"Flag" : `${db.getState().schedules[i].flag}`, "review" : `${db.getState().schedules[i].review}`});
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
    res.status(404).json("Error")

})
    
router.post('/schedules/:name/:creator',verify,(req,res)=>{
    var sch_name = req.sanitize(req.params.name);
    sch_name = escapeHTML(sch_name)
    var name = req.sanitize(req.params.creator);
    name = escapeHTML(name);
    for(let i = 0; i<db.getState().schedules.length; i++){
        if(db.getState().schedules[i].scheduleName===sch_name && db.getState().schedules[i].creator===name){
            db.get("schedules").remove({scheduleName: sch_name}).write();
            res.json("Schedule " + sch_name + " has been deleted")
        }
    }
    res.status(404).json("Name doesn't exist or you are trying to delete someone else's schedule!!")
    
});



//Task 9
router.post('/deleteall/schedules',verify,(req,res)=>{
    for(let i = 0;i<db.getState().schedules.length;i++){
        db.set('schedules',[]).write();
        res.json("done")
    }
});


//show schedules created by me
router.get('/show/creator/:name', verify,(req,res)=>{
    var name = req.sanitize(req.params.name);
    name = escapeHTML(name);
    let display = [];
    for(let i = 0; i<db.getState().schedules.length; i++){
        var size = `${db.getState().schedules[i].courseName.length}`
        

     
        if(db.getState().schedules[i].creator===name){
            display.push({"scheduleName": `${db.getState().schedules[i].scheduleName}`, "Numcourses" : `${size}`, "Creator" : `${db.getState().schedules[i].creator}`});
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
                console.log(display);
            } 
        }
    }
    if(display.length != 0){
        res.send(display)
    }
    else{
        res.status(404).json("Error") 
    }  
});


router.route('/review/:course',) //api/id:

    .get((req,res) =>{
        const course = req.sanitize(req.params.course);
        var exists = data.find(d => d.catalog_nbr === course.toUpperCase());
        var node = data.filter(function(d){
            return d.catalog_nbr ===course.toUpperCase();
        })
        .map(function(d){
            var info = {
                        "subject": d.subject,
                        "catalog_nbr": d.catalog_nbr,
                       }
        return info;
        });
        console.log(node);
        if(exists){
            res.send(node);
        }
        else{
            res.status(404).send("Course iD " + course + " was not found");
        }

    })

    router.route('/review/:course',) //api/id:

    .get((req,res) =>{
        const course = req.sanitize(req.params.course);
        const comment = req.sanitize(req.params.comment);
        var exists = data.find(d => d.catalog_nbr === course.toUpperCase());
        var node = data.filter(function(d){
            return d.catalog_nbr ===course.toUpperCase();
        })
        .map(function(d){
            var info = {
                        "subject": d.subject,
                        "catalog_nbr": d.catalog_nbr,
                        "review": comment
                       }
        return info;
        });
        console.log(node);
        if(exists){
            res.send(node);
        }
        else{
            res.status(404).send("Course iD " + course + " was not found");
        }

    })

    
    


module.exports = router;