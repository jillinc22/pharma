var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('ORG/COUNCIL LISTS:');
    console.log('=================================');
   
    var queryString =`SELECT * FROM tbl_user WHERE (varchar_userType != "Admin" AND varchar_userType != "Org/Council")`
    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        res.render('orgcouncil/lists/views/index', {tbl_user:results});
    });
});


module.exports = router;

module.exports = router;