var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var model = require('./flipkart_db');
router.get('/fetch/flipkart/mobile', function(req, res) {
    url = 'https://www.flipkart.com/mobile-phones-store';
    request(url, function(err, response, html) {
        if (err) {
            res.status(400).json(err);
        }
        if (!err) {
            var $ = cheerio.load(html);
            var product_details;
            $('.K6IBc-').each(function(index, element) {
                var pname = $(element).find(".iUmrbN").text();
                var more_details = $(element).find(".BXlZdc").text();
                var current_price = $(element).find("._3o3r66").text();
                product_details = new model.fetch({
                    name: pname,
                    otherdetails: more_details,
                    price: current_price,
                })
                product_details.save(function(err) {
                    if (err) {
                        res.status(400).json(err);
                    }
                })
            });
            res.json("data inserted");
        }
    })
})
module.exports = router;