var mongoose = require('mongoose');
var http = require('http');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
mongoose.Promise = global.Promise;
var conn = mongoose.connect('mongodb://localhost/scrape');
var product_details = mongoose.Schema({
    name: { type: String, required: true },
    other_details: { type: String, required: true },
    price: { type: String, required: true },
}, {
    collection: 'product_details',
    strict: true
});
var snapdeal_products = mongoose.Schema({
    product_title: { type: String, required: true },
    old_price: { type: String, required: true },
    new_price: { type: String, required: true },
    product_discount: { type: String, required: true },
}, {
    collection: 'snapdeal_products',
    strict: true
});
var product_page = mongoose.Schema({
    product_name: { type: String },
    other_details: { type: String },
}, {
    collection: 'product_page',
    strict: true
});
var get_data = conn.model("get_data", product_details);
var get_tshirts = conn.model("get_tshirts", snapdeal_products);
var inner_details = conn.model("inner_details", product_page);
module.exports = {
    fetch: get_data,
    snap_tshirts: get_tshirts,
    prod_page: inner_details,
}