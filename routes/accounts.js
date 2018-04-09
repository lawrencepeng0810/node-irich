var express = require('express');
var router = express.Router();
var models = require('../models'); // 找SQLITE 直接指向 account.js npm start 就不會錯誤


// 參數 next 用法
function requireAdmin(req, res, next) {
	if (!req.user || !req.user.admin) {
		next(new Error('Permission dined.'));
		return;
	}
	next();
}

router.get('/create', function(req, res, next) {		// req request, res response, 
	 // res.send('respond with a resource');
	 res.render('create_account',{ title:'iRich 愛記帳' });
});

// 當引用 function 若不通過 ,回傳 Error, 反之 會繼續往下 執行 next 參數
/* GET users listing. */
/* Generator View Page */
/*
	router.get('/create', requireAdmin, function(req, res, next) {		// req request, res response, 
	 // res.send('respond with a resource');
	 res.render('create_account',{title:'iRich 愛記帳'});
	});
*/

/* Submit */
router.post('/create',function(req, res, next) {
	//console.log(req.body);
	models.Account.create({
		title: req.body.title,
		type: req.body.type,
		cost: req.body.cost
	}).then(function(){
		res.redirect('/');
	});
})

// 獨立一筆詳細介紹頁面
router.get('/:account_id', function(req, res, next) {
	models.Account.findOne({
		where : { 
			id : req.params.account_id
		}
	}).then(function(account){
		res.render('account', { title: "iRich 愛記帳", account: account });
	})
});


// get, render 產生 update 頁面
router.get('/:account_id/update',function(req, res, next) {
	//console.log(req.params); // show 出提出需求的參數
	//console.log(req.query);  // URL後面帶 (?變數=Value) 用於form Get, POST URL不帶參數
	
	models.Account.findOne({
		where: { id : req.params.account_id }
	}).then(function(account) {
		res.render('update_account',{ title: "iRich 愛記帳", account : account });
	})
});

// post 方式, 則進行 update
router.post('/:account_id/update', function(req, res, next) {
	models.Account.findOne({
		where: {id : req.params.account_id }
	}).then(function(account){
		account.update({
			title: req.body.title,
			type: req.body.type,
			cost: req.body.cost
			});
		}).then(function(){
			res.redirect('/');
	});
});


// post 方式, 則進行刪除
router.post('/:account_id/delete', function(req, res, next) {
	models.Account.destroy({
		where: { id :req.params.account_id }
	}).then(function(){
		res.redirect('/');
	});
});

module.exports = router;
