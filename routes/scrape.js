var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
/* GET home page. */
router.get('/', function(req, res, next) {

    if(query = req.query.q){
        baseUrl = 'http://www.google.com/search?q=';
        fullUrl = baseUrl.concat(query, '+stock');
        console.log('Attempting to get page at: ' + fullUrl);
        request(fullUrl, function(error, response, html){
            if(!error){
                $ = cheerio.load(html);
                var stockPrice = $('tbody tr td span b').first().text()
                var stockSymbol = $('a b').first().text()
                var change = $('td span cite').first().text()
                var companyName = $('div h3 span').text().replace(' - ', '')
                var lastUpdated = $('table tbody tr td div div table .f,ct-active').first().text()
                var json = {"query": query, "companyName": companyName, "stockSymbol": stockSymbol, "lastUpdated": lastUpdated, "marketValue": stockPrice, "change": change};
                res.send(json);
            }
        });
    }
    else{
        sampleUrl = 'http://www.google.com/search?q=AAPL';
        request(sampleUrl, function(error, response, html){
            if(!error){
                res.send(html);
            }
        });
    }
});

module.exports = router;
