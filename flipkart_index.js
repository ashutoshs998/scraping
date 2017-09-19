var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var model = require('./flipkart_db');
var unirest = require('unirest');
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
    }),
    router.get('/fetch/snapdeal/tshirts', function(req, res) {
        url = 'https://www.snapdeal.com/products/mens-tshirts-polos';
        request(url, function(err, response, html) {
            if (err) {
                res.status(400).json(err);
            }
            if (!err) {
                var $ = cheerio.load(html);
                var snapdeal_tshirts;
                $('.product-desc-rating').each(function(index, element) {
                    var product_title = $(element).find(".product-title").text();
                    var old_price = $(element).find(".strike ").text();
                    var new_price = $(element).find(".product-price").text();
                    var product_discount = $(element).find(".product-discount").text().trim();
                    snapdeal_tshirts = new model.snap_tshirts({
                        product_title: product_title,
                        old_price: old_price,
                        new_price: new_price,
                        product_discount: product_discount,
                    })
                    snapdeal_tshirts.save(function(err) {
                        if (err) {
                            res.status(400).json(err);
                        }
                    })
                });
                res.json({ error: 0, message: "data inserted" });
            }
        })
    }),
    router.get('/fetch/nav/:scheme', function(req, res) {
        var scheme = req.params.scheme
        get_nav(res, scheme, function(err, html) {
            if (err) {
                res.status(400).json(err);
            }
        });
    });

function get_nav(res, scheme) {
    unirest.post("https://mutualfundsnav.p.mashape.com")
        .header("X-Mashape-Key", "I5VF8iKDRGmshCxZAHXAK3Nv3OvGp1pxlIfjsnVHwdXxoQ0Cso")
        .header("Content-Type", "application/json")
        .header("Accept", "application/json")
        .send({ "scodes": [scheme] })
        .end(function(result) {
            res.json(result.body);
        });
}
module.exports = router;