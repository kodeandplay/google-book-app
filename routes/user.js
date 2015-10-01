var router = require('express').Router(),
    user = require('../models/user'),
		config = require('../config'),
		bcrypt = require('bcrypt'),
		jwt = require('jwt-simple');

router.post('/valid', function(req, res) {

	if(!req.body.token) {
		console.log('No token');
		return res.json({ bSuccess: false });
	}

	var obj =	jwt.decode(req.body.token, config.secret);
	if(!!obj.username) {
	
		user.findUserByUsername(obj.username, function(err, oUser) {
			if(err) {
				console.log('Error:', err);
				return res.json({ bSuccess: false });
			}

			// No matching username 
			if(!oUser) {
				console.log('No user');
				return res.json({ bSuccess: false });
			}
			
			oUser.password = null;
			delete oUser.password;
		
			res.send({ user: oUser, bSuccess: true });
		});
	
	} else {

		res.json({ bSuccess: false });
	}

});

router.post('/register', function(req, res) {

	var oUser = { username: req.body.username, password: req.body.password };

	user.insert(oUser, function(err, result) {

		if(err) {
			return console.log('Error:', err);
		}

		res.json({ bSuccess: true });

	});

});

router.post('/login', function(req, res) {
	user.findUserByUsername( req.body.username, function(err, oUser) {


		if(err) {
			console.log('Error:', err);
			return res.json({ bSuccess: false });
		}

		// No matching username 
		if(!oUser) {
			console.log('No user');
			return res.json({ bSuccess: false });
		}

		// Compare password
		bcrypt.compare(req.body.password, oUser.password, function(err, valid) {
			if(err || !valid) {
				console.log('Error or not valid:', err, valid);
				return res.json({ bSuccess: false });
			}

			
			oUser.password = null;
			delete oUser.password;

			var token = jwt.encode({ username: oUser.username }, config.secret);
			res.send({ token: token, user: oUser, bSuccess: true });

		});
	
	});

});

module.exports = router;
