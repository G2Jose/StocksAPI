# StocksAPI
An API that fetches stock quotes. The API works by scraping google to find the relevant information. 

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
- Ensure that you have node and npm set up. 
- Clone into local machine. 
- Run 'npm start' in the project directory

