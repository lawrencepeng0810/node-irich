var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'iRich 愛記帳' });
  models.Account.findAll().then(function(value) {
  		//console.log(value);
  		res.render('index', { 
  			title: 'iRich 愛記帳',
  			accounts: value
  		});
  	});
});

module.exports = router;
