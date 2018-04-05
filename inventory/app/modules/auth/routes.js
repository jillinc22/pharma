var express = require('express');
var homepage = express.Router();
var office = express.Router();
var signup = express.Router();
var logoutRouter = express.Router();
var authMiddleware = require('./middlewares/auth');
var db = require('../../lib/database')();

homepage.get('/',authMiddleware.noAuthed,(req, res) => {

    res.render('auth/views/index');
    
});

homepage.post('/', (req, res) =>{
    
    console.log('PUMASOK SA POST NG HOME MODAL');

    var db = require('../../lib/database')();
    db.query(`SELECT * FROM tbl_user WHERE varchar_username="${req.body.modalusername}"`, (err, results, fields) => {
        if (err) throw err;

        if (results.length === 0) return res.redirect('/login?incorrect');

        var user = results[0];
        console.log(user);
        
        if (user.varchar_password !== req.body.modalpass) return res.redirect('/login?incorrect');
        
        if(user.char_userType == "admin"){
            console.log(user.char_userType);
            delete user.varchar_password;
            req.session.user = user;
            console.log("AdMINISTRATION");
            console.log('Admin: '+user.varchar_username);
            
            var queryString =`SELECT * FROM tbl_user WHERE char_userType="admin"`
            db.query(queryString, (err, results, fields) => {
                var tbl_user=results;
                if (err) console.log(err);
                console.log(results);
                req.session.tbl_user=tbl_user;
                console.log("==============REQ.SESSION admin================");
                console.log(req.session.tbl_user);
                console.log("==============REQ.SESSION admin================");
                return res.redirect('/admin');
            });
            
        }
    
        if(user.char_userType == "inStaff"){
            delete user.varchar_password;
            req.session.user = user;
            console.log('Student User:');
            console.log('Student: '+user.varchar_username);
            return res.redirect('/student/announcements');
        }
    
        if(user.char_userType == "offStaff"){
            delete user.varchar_password;
            req.session.user = user;
            console.log('Student User:');
            console.log('Student: '+user.varchar_username);
            return res.redirect('/office/announcements');
        }

    });

});

signup.get('/', (req,res) => {
    res.render('auth/views/signup');
});
signup.post('/', (req, res) => {
    
    var queryString = `INSERT INTO \`tbl_user\`
    (\`int_userID\`
    \`char_userType\`, 
    \`varchar_username\`, 
    \`varchar_eMail\`,
    \`varchar_password\`, 
    \`varchar_userFName\`, 
    \`varchar_userMName\`, 
    \`varchar_userLName\`, 
    \`varchar_mobilePhone\`)
    VALUES
    ("offStaff", 
    "${req.body.signupusername}",  
    "${req.body.signupemail}",
    "${req.body.signuppassword}", 
    "${req.body.signupfirstname}", 
    "${req.body.signupmiddlename}", 
    "${req.body.signuplastname}",
    "${req.body.signupcontact}");`;

    var queryString1 =`SELECT * FROM tbl_user ORDER BY int_userID DESC LIMIT 0,1`

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        console.log("===========================");
            console.log("Registering 1.....");
            console.log("===========================");
        db.query(queryString1, (err, results1, fields) => {
            // res.redirect('/login?signUpSuccess');
            if (err) throw err;
            console.log("===========================");
            console.log("Registering 2.....");
            console.log("===========================");
            console.log(results1);
            console.log("SUCCESS");
            res.redirect('/home');
            });
         });
    });

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        console.log("===========================");
        console.log("Router: LOG OUT");
        console.log("===========================");
        res.redirect('/home');
    });
});



exports.home = homepage;
exports.office = office;
exports.signup = signup;
exports.logout = logoutRouter;
// router.exports = router;