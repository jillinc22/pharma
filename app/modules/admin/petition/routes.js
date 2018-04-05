var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('ADMIN Diagnostics:');
    console.log('=================================');
    var queryString =`SELECT tbl_itemStock.int_itemStockID, tbl_medicine.varchar_medCode, tbl_itemStock.varchar_itemName, tbl_medicine.varchar_medGenName, tbl_itemStock.varchar_itemDescription, tbl_medicine.varchar_medForm, tbl_medicine.date_medicineExpiry, tbl_itemStock.decimal_itemPrice FROM tbl_itemStock JOIN tbl_medicine ON tbl_itemStock.int_itemStockID=tbl_medicine.int_itemStockID`
    
    var queryString =`SELECT tbl_itemStock.int_itemStockID, tbl_itemStock.varchar_itemName, tbl_diagnostic.varchar_diagnosticGenName, tbl_itemStock.varchar_itemDescription, tbl_diagnostic.varchar_diagnosticPacking, tbl_diagnostic.date_diagnosticExpiry, tbl_itemStock.decimal_itemPrice FROM tbl_itemStock JOIN tbl_diagnostic ON tbl_itemStock.int_itemStockID=tbl_diagnostic.int_itemStockID`
    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        res.render('admin/petition/views/index',{tbl_itemStock:results});
    });
});

router.get('/:int_petitID/editpetit', (req, res) => {
    var queryString = `SELECT * FROM tbl_petition
    WHERE int_petitID= ${req.params.int_petitID}`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`admin/petition/views/editpetit`,{result_petit:results});
    });
});

router.post('/:int_petitID/editpetit', (req, res) => {
    var queryString = `UPDATE tbl_petition SET        
    char_subjCode = "${req.body.petit_subjcode}", 
    varchar_petitStatus = "${req.body.petit_status}",
    varchar_petitTime = "${req.body.petit_time}",
    varchar_petitDays = "${req.body.petit_days}"

    WHERE int_petitID= ${req.params.int_petitID}`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.redirect('/admin/petition');
    });
});



module.exports = router;