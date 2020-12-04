app.get('/api/display/schedule/:scheduleName', (req, res) => {
    let schedName = req.sanitize(req.params.scheduleName);
    let showSched = [];
    for (let i = 0; i < db.getState().Schedule.length; i++) {
        if (db.getState().Schedule[i].schedule_name.toUpperCase() === schedName.toUpperCase()) {
            for (let k = 0; k < db.getState().Schedule[i].course_name.length; k++) {
                let showCourse = db.getState().Schedule[i].course_name[k];
                let showSubject = db.getState().Schedule[i].subject[k];
                const course = data.filter(a => a.subject.toString().toLowerCase() === req.sanitize(showSubject.toString().toLowerCase()));
                const final = course.filter(a => a.catalog_nbr.toString().toUpperCase() === req.sanitize(showCourse.toString().toUpperCase()));
                showSched.push(final);
            }
            res.send(showSched);
            return;
        }
    }
    res.status(404).send("Schedule not found");
});