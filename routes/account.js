var router = require('express').Router(),
    account = require('../models/account'),
		config = require('../config'),
		bcrypt = require('bcrypt'),
		jwt = require('jwt-simple');


router.get('/list', function(req, res) {
	
	account.getAllLists({ username: req.auth.username }, function(err, result) {
		if(err) { 
			console.log('Error:',err);
			return res.json({ bSuccess: false });
		}

		res.json({ bSuccess: true, result: result });
	});	

});

router.post('/list', function(req, res) {
	
	var list_name = req.body.listName,
			options = { username: req.auth.username, list_name: list_name };

	account.addList(options, function(err, results) {
		if(err) {
			console.log('Error:', err);
			return res.json({ bSuccess: false });
		}

		res.json({ bSuccess: true, listItem: { list_id: results.insertId, list_name: list_name } } );
	});

});

router.post('/book', function(req, res) {
	
	var book = req.body.book;
	var list_id = req.body.list_id;

	var options = { author: book.author, title: book.title, list_id: list_id };

	account.addBookToList( options, function(err, result) {
		if(err) {
			console.log('Error:', err);
			return res.json({ bSuccess: false });
		}
		
		res.json({ bSuccess: true });
	});

});

module.exports = router;





