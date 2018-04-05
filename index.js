require('dotenv').config();

var express = require('express');
var winston = require('winston');
var app = express();
var func = require("./app/index.js")
func(app);

var port = process.env.PORT || 8000
server.listen(port, function() {
    console.log("App is running on port " + port);
});