var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var colors = require('colors');
/* GET home page. */
router.get('/', function(req, res, next) {

    if(query = req.query.q){
        // console.log("Received query" + query)
        baseUrl = 'http://www.google.com/search?q=';
        fullUrl = baseUrl.concat(query, '+stock');
        // console.log('Attempting to get page at: ' + fullUrl);
        request(fullUrl, function(error, response, html){
            var query = this;
            if(!error){
                var conversionRate = 1;
                $ = cheerio.load(html);
                var stockPrice = $('tbody tr td span b').first().text()
                if(query.indexOf("NASDAQ")!=-1 || query.indexOf("nasdaq")!=-1  ){
                    var magicVariable = {
                        query: query, 
                        conversionRate: conversionRate,
                        stockPrice: stockPrice, 
                        $: $
                    }
                    // console.log(magicVariable)
                    request("http://api.fixer.io/latest?base=USD&symbols=CAD", function(e, r, h){
                        var s = this;

                        console.log(s);
                        s.conversionRate = JSON.parse(r.body)["rates"]["CAD"];
                        // console.log("conversion rate = " + conversionRate);
                        s.stockPrice = (s.stockPrice * parseFloat(conversionRate)).toString();
                        var stockSymbol = s.$('a b').first().text();
                        var change = s.$('td span cite').first().text();
                        s.change = (parseFloat(s.change) * parseFloat(s.conversionRate)).toString();
                        console.log('Block 1. Query:'.red+query.red+' '+stockSymbol.red+'\tParsed change =\t'+change.red)
                        console.log(s);
                        var companyName = s.$('div h3 span').text().replace(' - ', '');
                        var lastUpdated = s.$('table tbody tr td div div table .f,ct-active').first().text();
                        var json = {"query": s.query, "companyName": companyName, "stockSymbol": stockSymbol, "lastUpdated": lastUpdated, "marketValue": s.stockPrice, "change": s.change};
                        // console.log(json);
                        res.send(json);
                    }.bind(magicVariable));
                }else{
                    var stockSymbol = $('a b').first().text()
                    var change = $('td span cite').first().text()
                    change = parseFloat(change).toString();
                    var companyName = $('div h3 span').text().replace(' - ', '')
                    var lastUpdated = $('table tbody tr td div div table .f,ct-active').first().text()
                    var json = {"query": query, "companyName": companyName, "stockSymbol": stockSymbol, "lastUpdated": lastUpdated, "marketValue": stockPrice, "change": change};
                    // console.log('Block 2. '. yellow+stockSymbol.yellow+'\tParsed change =\t'+change.yellow)
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
