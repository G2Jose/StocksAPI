# StocksAPI
An API that fetches stock quotes. The API works by scraping google to find the relevant information. All prices are currently shown in Canadian Dollars (CAD). 

Requests can be sent in the form: `http://domain.com:443/scrape?q=aapl+nasdaq`. A working example can be found at `http://georgejose.com:443/scrape?q=aapl+nasdaq`, where `aapl+nasdaq` is the search term. 

Responses provided are in JSON: 
```
{
   "query":"aapl+nasdaq",
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

##To Do
- Implement option to change currency amounts are shown in
- Implement consistent currency conversion. Currently, only USD -> CAD is supported. Conversion is performed only when the search string contains the word `'NASDAQ'` or `'NYSE'`
- make the API scalable
  - Implement API key tokens to restrict number of requests possible
