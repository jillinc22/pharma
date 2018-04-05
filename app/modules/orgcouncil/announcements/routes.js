var express = require('express');
var router = express.Router();
// var router = require('express').Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('Pumasok sa orgcouncil announcements');
    console.log('=================================');
    var queryString ='SELECT int_announcementId, date_announcementDate, varchar_announcementTitle, varchar_announcementText, int_userID FROM tbl_announcement'
    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        var tbl_announcement=results;
        req.session.tbl_announcement=tbl_announcement;
        return res.render('orgcouncil/announcements/views/index', { tbl_announcement: results, user:req.session.user });
    });
});

router.post('/', (req, res)=>{
        var queryString = ` INSERT INTO tbl_announcement(
        \`date_announcementDate\`,
        \`varchar_announcementTitle\`,
        \`varchar_announcementText\`,
        \`int_userID\`) 
        
        
        VALUES(
        "${req.body.date_announcementDate}",
        "${req.body.title}",
        "${req.body.post}",
        "${req.body.userid}")`;
       
    
        db.query(queryString, (err, results, fields) => {        
            if (err) throw err;
            res.redirect('/orgcouncil/announcements');
        });
    }); 


module.exports = router;