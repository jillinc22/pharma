require('dotenv').config();

var express = require('express');
var winston = require('winston');
var app = express();
require('./app')(app);

app.listen(app.get('port'), () => {
    winston.info(`Pharmastar Inventory is on PORT:${app.get('port')}`);
});