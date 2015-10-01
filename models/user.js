var pool = require('../pool'),
		jwt = require('jwt-simple'),
		bcrypt = require('bcrypt'),
		config = require('../config');

var insert = function(user, cb) {

	bcrypt.hash(user.password, 10, function(err, pwHash) {
		
		user.password = pwHash;

		pool.getConnection(function(err, db) {
		
			if(err) {
				console.log('Error:', err);
				return cb(err);
			}

			db.query('INSERT INTO user SET ?', user, function(err, result) {

				db.release();

				if(err) {
					console.log('Error:', err);
					return cb(err);
				}

				cb(null, result);

			});

		});

	});

}; 

var findUserByUsername = function(username, cb) {

	pool.getConnection(function(err, db) {

		if(err) {
			console.log('Error:', err);
			return cb(err);
		}


		var sql = 'SELECT username, password FROM user WHERE username = ?';
		db.query({
			sql: sql,
			values: [username]
		}, function(err, results, fields) {
	
			db.release();
	
			if(err) {
				console.log('Error:', err);
				return cb(err);
			}

			cb(null, results[0]);

		});
	});

};

module.exports = {
	insert: insert,
	findUserByUsername: findUserByUsername
};
