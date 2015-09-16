var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(new Date());

    if(query = req.query.q){
        // console.log("Received query" + query)
        baseUrl = 'http://www.google.com/search?q=';
        fullUrl = baseUrl.concat(query, '+stock');
        console.log('Attempting to get page at: ' + fullUrl);
        request(fullUrl, function(error, response, html){
            var query = this;
            if(!error){
                var conversionRate = 1;
                $ = cheerio.load(html);
                var stockPrice = $('tbody tr td span b').first().text()
                if(query.indexOf("NASDAQ")!=-1 || query.indexOf("nasdaq")!=-1  ){
                    request("http://api.fixer.io/latest?base=USD&symbols=CAD", function(e, r, h){
                    conversionRate = JSON.parse(r.body)["rates"]["CAD"];
                    // console.log("conversion rate = " + conversionRate);
                    stockPrice = (stockPrice * parseFloat(conversionRate)).toString();
                    var stockSymbol = $('a b').first().text();
                    var change = $('td span cite').first().text();
                    console.log('change = ' + change)

                    change = (parseFloat(change) * parseFloat(conversionRate)).toString();
                    console.log('Parsed change = '+change)
                    var companyName = $('div h3 span').text().replace(' - ', '');
                    var lastUpdated = $('table tbody tr td div div table .f,ct-active').first().text();
                    var json = {"query": query, "companyName": companyName, "stockSymbol": stockSymbol, "lastUpdated": lastUpdated, "marketValue": stockPrice, "change": change};
                    // console.log(json);
                    res.send(json);
                    });
                }else{
                    var stockSymbol = $('a b').first().text()
                    var change = $('td span cite').first().text()
                    var companyName = $('div h3 span').text().replace(' - ', '')
                    var lastUpdated = $('table tbody tr td div div table .f,ct-active').first().text()
                    var json = {"query": query, "companyName": companyName, "stockSymbol": stockSymbol, "lastUpdated": lastUpdated, "marketValue": stockPrice, "change": change};
                    // console.log(json);
                    res.send(json);
                }
            }
        }.bind(query));
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
