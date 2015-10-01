var pool = require('../pool'),
		jwt = require('jwt-simple'),
		bcrypt = require('bcrypt'),
		config = require('../config');

var getAllLists = function(options, cb) {

	pool.getConnection(function(err, db) {

		if(err) {
			console.log('Error:', err);
			return cb(err);
		}

		var sql = 'SELECT list_id, list_name FROM list INNER JOIN user USING (user_id) WHERE username = ?';
		db.query({
			sql: sql,
			values: [options.username]
		}, function(err, results, fields) {

			db.release();

			if(err) {
				console.log('Error:', err);
				return cb(err);
			}

			cb(null, results); 
		});

	});
}; 


var getBooksForList = function(options, cb) {
	
};


var addBookToList = function(options, cb) {

	pool.getConnection(function(err, db) {
		if(err) {
			console.log('Error:', err);
			return cb(err);
		}

		var sql = 'INSERT INTO book SET ?';
		db.query({
			sql: sql,
			values: options
		}, function(err, results, fields) {

			db.release();

			if(err) {
				console.log('Error:', err);
				return cb(err);
			}

			cb(null, results);

		});

	});
};


var addList = function(options, cb) {
	
	pool.getConnection(function(err, db) {

		if(err) {
			console.log('Error:', err);
			return cb(err);
		}

		var sql = 'INSERT INTO list (user_id, list_name) SELECT user_id, ? FROM user WHERE username = ?';
  	db.query({
			sql: sql,
			values: [options.list_name, options.username]
		}, function(err, results, fields) {
		
			db.release();

			if(err) return cb(err);

			cb(null, results);

		});
	});
};


module.exports = {
	getAllLists: getAllLists,
	getBooksForList: getBooksForList,
	addBookToList: addBookToList,
	addList: addList
};













