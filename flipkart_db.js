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
var snapdeal_products = mongoose.Schema({
    product_title: { type: String, required: true },
    old_price: { type: String, required: true },
    new_price: { type: String, required: true },
    product_discount: { type: String, required: true },
}, {
    collection: 'snapdeal_products',
    strict: true
});
var productpage = mongoose.Schema({
    product_name: { type: String },
    otherdetails: { type: String },
}, {
    collection: 'productpage',
    strict: true
});
var get_data = conn.model("get_data", product_details);
var get_tshirts = conn.model("get_tshirts", snapdeal_products);
var innerdetails = conn.model("innerdetails", productpage);
module.exports = {
    fetch: get_data,
    snap_tshirts: get_tshirts,
    prod_page: innerdetails,
}