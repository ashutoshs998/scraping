var express = require('express');
var app = express();
var routes = require('./flipkart_index.js');
var db = require('./flipkart_db.js')
app.use('/', routes);
app.listen(3000, function() {
    console.log("Server started at port number: 3000");
});