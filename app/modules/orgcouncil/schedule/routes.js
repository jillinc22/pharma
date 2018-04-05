var express = require('express');
var router = express.Router();
// var router = require('express').Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('Pumasok sa orgcouncil schedule');
    console.log('=================================');
    var queryString =`SELECT * FROM tbl_sched`
    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        var tbl_sched=results;
        req.session.tbl_sched=tbl_sched;
        return res.render('orgcouncil/schedule/views/index', { tbl_sched: results,user:req.session.user });
    });
});

router.post('/addschedule', (req, res) => {
    var queryString = `INSERT INTO \`tbl_sched\` 
    (\`char_courseCode\`, 
    \`varchar_schedDay\`,
    \`varchar_schedTime\`,
    \`varchar_schedRoom\`,
    \`varchar_schedProf\`)
    VALUES
    ("${req.body.sched_code}",
    "${req.body.sched_days}",
    "${req.body.sched_time}",
    "${req.body.sched_room}",
    "${req.body.sched_prof}");`;
    
    
   

    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.redirect('/orgcouncil/schedule');
    });
});


module.exports = router;
