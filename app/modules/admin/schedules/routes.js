var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('Machine:');
    console.log('=================================');
   
    var queryString =`SELECT tbl_itemStock.int_itemStockID, tbl_machine.varchar_serialCode, tbl_itemStock.varchar_itemName, tbl_itemStock.varchar_itemDescription, tbl_itemStock.decimal_itemPrice FROM tbl_itemStock JOIN tbl_machine ON tbl_itemStock.int_itemStockID=tbl_machine.int_itemStockID`
    db.query(queryString, (err, results, fields) => {
        if (err) console.log(err);
        console.log(results);
        res.render('admin/schedules/views/index',{tbl_itemStock:results});
    });
});

router.post('/',(req, res) => {
    console.log('=================================');
    console.log('Medicines Add');
    console.log('=================================');

    var queryString1 = `INSERT INTO \`tbl_itemStock\` (
        
        \`varchar_itemName\`,         
        \`varchar_itemDescription\`, 
        \`decimal_itemPrice\`)
                
        VALUES(
        "${req.body.machname}",
        "${req.body.machdescription}",
        "${req.body.machprice}");`;
       
        var queryString2 =`SELECT * FROM tbl_itemStock ORDER BY int_itemStockID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;    
            console.log(results1);
            var queryString3 = `INSERT INTO \`tbl_machine\` (
                \`int_itemStockID\`,
                \`varchar_serialCode\`)
                
                VALUES(
                "${results2.int_itemStockID}",
                "${req.body.machcode}");`;
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
// router.get('/:int_schedID/editsched', (req, res) => {
//     var queryString = `SELECT * FROM tbl_sched
//     WHERE int_schedID= ${req.params.int_schedID}`;
    
//     db.query(queryString, (err, results, fields) => {        
//         if (err) throw err;
//         res.render(`admin/schedules/views/editsched`,{result_stud:results});
//     });
// });

// router.post('/:int_schedID/editsched', (req, res) => {
//     var queryString = `UPDATE tbl_sched SET        
//     char_courseCode = "${req.body.sched_subjcode}", 
//     varchar_schedDay = "${req.body.sched_day}",
//     varchar_schedTime = "${req.body.sched_time}",
//     varchar_schedRoom = "${req.body.sched_room}",
//     varchar_schedProf = "${req.body.sched_prof}"

//     WHERE int_schedID= ${req.params.int_schedID}`;
    
//     db.query(queryString, (err, results, fields) => {        
//         if (err) throw err;
//         res.redirect('/admin/schedules');
//     });
// });

router.get('/:int_itemStockID/editsched', (req, res) => {
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_itemStock JOIN tbl_machine ON tbl_itemStock.int_itemStockID=tbl_machine.int_itemStockID
    WHERE tbl_itemStock.int_itemStockID = "${req.params.int_itemStockID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`admin/petition/views/editsched`,{result_mach:results});
    });
});

router.post('/:int_itemStockID/editsched', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_itemStock SET
    varchar_itemName = "${req.body.machname}",
    varchar_itemDescription = "${req.body.machdescription}",
    decimal_itemPrice = "${req.body.machprice}"
    WHERE tbl_itemStock.int_itemStockID = "${req.body.int_itemStockID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);

        var queryString2 = `UPDATE tbl_diagnostic SET
        varchar_serialCode = "${req.body.machcode}",
        WHERE tbl_machine.int_itemStockID = "${req.body.int_itemStockID}"`;
        
        db.query(queryString2, (err, results2, fields) => {        
            if (err) throw err;
            console.log(results2);
            res.redirect('/admin/schedules');
    });
});
});


module.exports = router;