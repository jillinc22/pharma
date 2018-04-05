var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('ORG/COUNCIL PROFILE:');
    console.log('=================================');
   
    var queryString =`SELECT * FROM tbl_user WHERE tbl_user.int_userID = ?`
    db.query(queryString,[req.session.user.int_userID], (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        res.render('orgcouncil/profile/views/index', {tbl_user:results});
    });
});

router.post('/editprofile', (req, res) => {
    console.log("============================");
    console.log('ADMIN EDITPROFILE:');
    console.log("============================");
    const queryString1 = `UPDATE tbl_user SET        
    varchar_userFName = ("${req.body.user_fname}"),
    varchar_userLName = ("${req.body.user_lname}"),
    varchar_userEmailAdd = ("${req.body.user_email}"),
    varchar_userPassword = ("${req.body.user_password}"),
    varchar_userAddress = ("${req.body.user_address}")
    WHERE int_userID = ${req.body.userid};`;

    var queryString2 = `INSERT INTO \`tbl_orgmemb\`(\`int_userID\`, \`char_orgCode\`)
    VALUES(${req.body.userid}, "${req.body.orgcode}");`;
    

    db.query(queryString1, (err, results, fields) => {        
        if (err) throw err;         
        
        db.query(queryString2, (err, results, fields) => {        
            if (err) throw err;         
            
            return res.redirect('/orgcouncil/profile'); 
            
        });
        
    });
});

module.exports = router;