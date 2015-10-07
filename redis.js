var redis = require('redis'),
		config = require('./config'),
		client = redis.createClient();

client.auth(config.redisPassword, function(err, data) {
	console.log('Redis authentication: ok');
});

client.on('error', function(err) {
	console.log('Error:', err);
});

client.on('connect', function() {
	console.log('Redis connection: ok');
});

var checkRedis = function(redisKey, cb) {
	client.hgetall(redisKey, function(err, result) {
		if(err) {
			console.log('Error:', err);
			return cb(err);
		}

		cb(null, result, client);
	});
}


module.exports = checkRedis;


