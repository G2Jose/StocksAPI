var express = require('express');
var router = express.Router();
var self = this;
var p = {
	"test": 1
}
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
	  var json = {
	  	"variable": this["test"]
	  }
	  res.send(json);
}.bind(p));
p++
module.exports = router;
