var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var nodemailer = require('nodemailer');

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('Medicines:');
    console.log('=================================');
    var queryString =`SELECT tbl_itemStock.int_itemStockID, tbl_medicine.varchar_medCode, tbl_itemStock.varchar_itemName, tbl_medicine.varchar_medGenName, tbl_itemStock.varchar_itemDescription, tbl_medicine.varchar_medForm, tbl_medicine.date_medicineExpiry, tbl_itemStock.decimal_itemPrice FROM tbl_itemStock JOIN tbl_medicine ON tbl_itemStock.int_itemStockID=tbl_medicine.int_itemStockID`
    
    db.query(queryString, (err, results, fields) => {
        console.log(results);
        if (err) console.log(err);
        // console.log(results);
        res.render('admin/colleges/views/index', {tbl_itemStock: results});
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
        "${req.body.medname}",
        "${req.body.meddescription}",
        "${req.body.medprice}");`;
       
        var queryString2 =`SELECT * FROM tbl_itemStock ORDER BY int_itemStockID DESC LIMIT 0,1`

        db.query(queryString1, (err, results1, fields) => {        
            if (err) throw err;    
            console.log(results1);
            var queryString3 = `INSERT INTO \`tbl_medicine\` (
                \`int_itemStockID\`,
                \`varchar_medCode\`,         
                \`varchar_medGenName\`, 
                \`varchar_medForm\`, 
                \`date_medicineExpiry\`)
                
                VALUES(
                "${results2.int_itemStockID}",
                "${req.body.medcode}",
                "${req.body.medgen}",
                "${req.body.medform}",
                "${req.body.medexpiry}");`;
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

// router.get('/:int_collegeID/edit', (req, res) => {
//     console.log("PUMASOK SA GET REQ.PARAMS")
//     var queryString = `SELECT * FROM tbl_college
//     WHERE int_collegeID= ${req.params.int_collegeID}`;
    
//     db.query(queryString, (err, results, fields) => {        
//         if (err) throw err;
//         res.render(`admin/colleges/views/updatecollege`,{result_college:results});
//     });
// });

// router.post('/:int_collegeID/edit/updatecollege', (req, res) => {
//     var queryString = `UPDATE tbl_college SET        
//     varchar_collegeEmail = "${req.body.college_email}", varchar_collegePassword = "${req.body.college_password}"
//     WHERE int_collegeID= ${req.body.college_ID}`;
    
//     db.query(queryString, (err, results, fields) => {        
//         if (err) throw err;
//         res.redirect('/admin/colleges');
//     });
// });

// router.get('/:int_collegeID/sendemail', (req, res) => {
//     console.log("PUMASOK SA GET REQ.PARAMS")
//     var queryString = `SELECT * FROM tbl_college
//     WHERE int_collegeID= ${req.params.int_collegeID}`;
    
//     db.query(queryString, (err, results, fields) => {        
//         if (err) throw err;
//         res.render(`admin/colleges/views/sendemail`,{result_college:results});
//     });
// });

// router.post('/:int_collegeID/sendemail', (req,res) => {
//     console.log(`${req.params.int_collegeID}`);
//     console.log("SENDING EMAIL");

//     var queryString = `SELECT * FROM tbl_college
//     WHERE int_collegeID= ${req.params.int_collegeID}`;
//     db.query(queryString, (err, results, fields) => {        
//         if (err) throw err;
//         var session_email = results[0];
    

//     nodemailer.createTestAccount((err, account) => {
//         // create reusable transporter object using the default SMTP transport
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                    user: 'abigaledr13@gmail.com',
//                    pass: 'ughbee358'
//                }
//            });
    
//         // setup email data with unicode symbols
//         let mailOptions = {
//             from: '"Irregular Please - Admin" <abigaledr13@gmail.com>', // sender address
//             to: session_email.varchar_collegeEmail, // list of receivers
//             subject: 'Irregular Please - College Account Details', // Subject line
//             text: 'Hello!', // plain text body
//             html: `<b>Welcome to our web application called "Irregular Please". <br>The following information will be your current login details to use our application.</b> <p>You can edit/update your information anytime, once you login using this account details.<hr> Email: ${session_email.varchar_collegeEmail} <br> Password: ${session_email.varchar_collegePassword} <hr><br> Thank You!` // html body
//         };
//         console.log("==================================");
//         console.log("SENDING TO:");
//         console.log(session_email.varchar_collegeEmail);
//         console.log("==================================");
    
//         // send mail with defined transport object
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             console.log('Message sent: %s', info.messageId);
//             // Preview only available when sending through an Ethereal account
//             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
//             // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//             // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//             });
//             res.redirect('/admin/colleges');
//         });
//     })
// })

router.get('/:int_itemStockID/updatemed', (req, res) => {
    console.log("PUMASOK SA GET REQ.PARAMS")
    
    var queryString = `SELECT * FROM tbl_itemStock JOIN tbl_medicine ON tbl_itemStock.int_itemStockID=tbl_medicine.int_itemStockID
    WHERE tbl_itemStock.int_itemStockID = "${req.params.int_itemStockID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        res.render(`admin/colleges/views/updatemed`,{result_med:results});
    });
});

router.post('/:int_itemStockID/updatemed', (req, res) => {
    console.log("PUMASOK SA POST REQ.PARAMS")
    
    var queryString = `UPDATE tbl_itemStock SET
    varchar_itemName = "${req.body.medname}",
    varchar_itemDescription = "${req.body.meddescription}",
    decimal_itemPrice = "${req.body.medprice}"
    WHERE tbl_itemStock.int_itemStockID = "${req.body.int_itemStockID}"`;
    
    db.query(queryString, (err, results, fields) => {        
        if (err) throw err;
        console.log(results);
        var queryString2 = `UPDATE tbl_medicine SET
        varchar_medCode = "${req.body.medcode}",
        varchar_medGenName = "${req.body.medgen}",
        varchar_medForm = "${req.body.medform}", date_medicineExpiry = "${req.body.medexpiry}"
        WHERE tbl_medicine.int_itemStockID = "${req.body.int_itemStockID}"`;
        db.query(queryString2, (err, results2, fields) => {        
            if (err) throw err;
            console.log(results2);
            res.redirect('/admin/colleges');
    });
});
});


module.exports = router;