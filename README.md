# StocksAPI
An API that fetches stock quotes. The API works by scraping google to find the relevant information. All prices are currently shown in Canadian Dollars (CAD). 

Requests can be sent in the form: `http://domain.com:443/scrape?q=aapl`. A working example can be found at `http://georgejose.com:443/scrape?q=aapl`, where `aapl` is the search term. 

Responses provided are in JSON: 
```
{
   "query":"aapl",
   "companyName":"Apple Inc. (NASDAQ)",
   "stockSymbol":"AAPL",
   "lastUpdated":"Sep 21 10:48am EDT",
   "marketValue":"114.73",
   "change":"1.28"
}
```



## How to use
- Set up [node.js, npm](https://nodejs.org)
- Clone repository `git clone https://github.com/willedflipper66/stocksapi.git`
- Install node.js packages `sudo npm install`
- Launch node.js `sudo npm start bin/www`
- You should now be able to view the website at `http://localhost:443/scrape?q=insertcompanynamehere`

