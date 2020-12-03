const router = require('express').Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
var escapeHTML = require('escape-html');
db.defaults({schedules:[]}).write();
const expressSanitizer = require('express-sanitizer');
var data = require('../data.json');


router.use(expressSanitizer());

//Task 1
router.route('/courses',)  //api/courses
    .get((req,res)=>{
        const node= data.map(function(d){
            var info = {"subject": d.subject,
                        "className": d.className
                       }
            return info;
        });
    
        res.send(node);
        console.log("Get courses")
    })

//Task 2
router.route('/:data_subject',) //api/id:

    .get((req,res) =>{
        const subject = req.sanitize(req.params.data_subject);
        var exists = data.find(d => d.subject === subject);
        var node = data.filter(function(d){
            return d.subject ===subject;
        })
        .map(function(d){
            var info = {"subject": d.subject,
                        "catalog_nbr": d.catalog_nbr
                       }
        return info;
        });
        if(exists){
            res.send(node);
        }
        else{
            res.status(404).send("Subject " + subject + " was not found");
        }

    })

    //task 3
    router.get('/subject/:subject/:code/:component?', (req, res) => { //api/subject/:/:/:?
        var sub = data.filter(c => c.subject.toString().toUpperCase() === req.sanitize(req.params.subject.toString().toUpperCase()));
        var course_code = sub.filter(c => c.catalog_nbr.toString().toUpperCase() === req.sanitize(req.params.code.toString().toUpperCase()));
        if (sub.length===0 || course_code.length===0) {
            res.status(404).send("Subject" + sub + " was not found, or" + course_code + " was not found");
        }
        if(course_code.filter(c => c.course_info[0].ssr_component.toUpperCase() === req.sanitize(req.params.component))){
            res.send(course_code)
        }
        else {
            res.send(course_code)
        }
    });

    module.exports = router;
