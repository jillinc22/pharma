require('dotenv').config();

var express = require('express');
var winston = require('winston');
var app = express();
var function = require("./app/index.js");
funct(app);

app.listen(app.get('port'), () => {
    winston.info(`Pharmastar Inventory is on PORT:${app.get('port')}`);
});