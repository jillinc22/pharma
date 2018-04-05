var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('ADMIN MANAGE ORG/COUNCIL:');
    console.log('=================================');
   
    var queryString =`SELECT * FROM tbl_org`
    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        res.render('admin/orgcouncil/views/index', {tbl_org:results});
    });
});

router.post('/addorgcouncil', (req, res) => {
    
    var queryString1 = `INSERT INTO \`tbl_org\` (\`varchar_orgName\`, \`char_orgCode\`)
    VALUES("${req.body.org_name}","${req.body.org_code}");`;


    db.query(queryString1, (err, results, fields) => {
        if (err) throw err;
        
        res.redirect('/admin/orgcouncil');
    });
});


module.exports = router;