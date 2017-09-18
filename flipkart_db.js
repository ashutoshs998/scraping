var mongoose = require('mongoose');
var http = require('http');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
mongoose.Promise = global.Promise;
var conn = mongoose.connect('mongodb://localhost/scrape');
var product_details = mongoose.Schema({
    name: { type: String, required: true },
    otherdetails: { type: String, required: true },
    price: { type: String, required: true },
}, {
    collection: 'product_details',
    strict: true
});
var get_data = conn.model("get_data", product_details);
module.exports = {
    fetch: get_data,
}