var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('ADMIN Diagnostics:');
    console.log('=================================');
    var queryString =`SELECT tbl_itemStock.int_itemStockID, tbl_itemStock.varchar_itemName, tbl_diagnostic.varchar_diagnosticGenName, tbl_itemStock.varchar_itemDescription, tbl_diagnostic.varchar_diagnosticPacking, tbl_diagnostic.date_diagnosticExpiry, tbl_itemStock.decimal_itemPrice FROM tbl_itemStock JOIN tbl_diagnostic ON tbl_itemStock.int_itemStockID=tbl_diagnostic.int_itemStockID`
    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        res.render('admin/petition/views/index',{tbl_itemStock:results});
    });
});

router.post('/',(req, res) => {
    console.log('=================================');
    console.log('Diagnostics Add:');
    console.log('=================================');

    var queryString1 = `INSERT INTO \`tbl_itemStock\` (
        
        \`varchar_itemName\`,         
        \`varchar_itemDescription\`, 
        \`decimal_itemPrice\`,
        \`enum_itemType\`)
                
        VALUES(
        "${req.body.diagname}",
        "${req.body.diagdescription}",
        "${req.body.diagprice}"
        "Diagnostic");`;
       
        var queryString2 =`SELECT * FROM tbl_itemStock ORDER BY int_itemStockID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;    
            console.log(results1);
            var queryString3 = `INSERT INTO \`tbl_diagnostic\` (
                \`int_itemStockID\`,         
                \`varchar_diagnosticGenName\`, 
                \`varchar_diagnosticPacking\`, 
                \`date_diagnosticExpiry\`)
                
                VALUES(
                "${results2.int_itemStockID}",
                "${req.body.diaggen}",
                "${req.body.diagpacking}",
                "${req.body.diagexpiry}");`;
                db.query(queryString2, (err, results2, fields) => {        
                if (err) throw err;
                console.log(results2);
                var results2 = results2[0];
                    db.query(queryString3, (err, results3, fields) => {        
                        if (err) throw err;

                        console.log(results3);
                    
                res.redirect('/admin');
        });
        });

    });


});

// router.get('/:int_petitID/editpetit', (req, res) => {
//     var queryString = `SELECT * FROM tbl_petition
//     WHERE int_petitID= ${req.params.int_petitID}`;
    
//     db.query(queryString, (err, results, fields) => {        
//         if (err) throw err;
//         res.render(`admin/petition/views/editpetit`,{result_petit:results});
//     });
// });

// router.post('/:int_petitID/editpetit', (req, res) => {
//     var queryString = `UPDATE tbl_petition SET        
//     char_subjCode = "${req.body.petit_subjcode}", 
//     varchar_petitStatus = "${req.body.petit_status}",
//     varchar_petitTime = "${req.body.petit_time}",
//     varchar_petitDays = "${req.body.petit_days}"

//     WHERE int_petitID= ${req.params.int_petitID}`;
    
//     db.query(queryString, (err, results, fields) => {        
//         if (err) throw err;
//         res.redirect('/admin/petition');
//     });
// });
router.get('/:int_itemStockID/editpetit', (req, res) => {
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_itemStock JOIN tbl_diagnostic ON tbl_itemStock.int_itemStockID=tbl_diagnostic.int_itemStockID
    WHERE tbl_itemStock.int_itemStockID = "${req.params.int_itemStockID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`admin/petition/views/editpetit`,{result_diag:results});
    });
});

router.post('/:int_itemStockID/editpetit', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_itemStock SET
    varchar_itemName = "${req.body.diagname}",
    varchar_itemDescription = "${req.body.diagdescription}",
    decimal_itemPrice = "${req.body.diagprice}"
    WHERE tbl_itemStock.int_itemStockID = "${req.body.int_itemStockID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        var queryString2 = `UPDATE tbl_diagnostic SET
        varchar_diagGenName = "${req.body.diaggen}",
        varchar_diagPacking = "${req.body.diagform}", date_diagnosticExpiry = "${req.body.diagexpiry}"
        WHERE tbl_diagnostic.int_itemStockID = "${req.body.int_itemStockID}"`;
        db.query(queryString2, (err, results2, fields) => {        
            if (err) throw err;
            console.log(results2);
            res.redirect('/admin/petition');
    });
});
});


module.exports = router;